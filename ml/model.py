import cv2
import numpy as np
import logging
from pathlib import Path
import datetime

class RustDetector:
    def _init_(self):
        self.setup_logging()
        self.output_dir = Path("rust_detections")
        self.output_dir.mkdir(exist_ok=True)
        
        # HSV ranges for rust
        self.rust_lower = np.array([0, 70, 30])
        self.rust_upper = np.array([20, 255, 180])
        
        self.rust_lower2 = np.array([160, 70, 30])
        self.rust_upper2 = np.array([180, 255, 180])
        
        self.rust_lower3 = np.array([10, 80, 30])
        self.rust_upper3 = np.array([25, 255, 150])
        
        self.min_area = 50
        self.texture_threshold = 25
        
        # Store the last alert time
        self.last_alert_time = datetime.datetime.now()
        self.alert_cooldown = 2  # seconds

    def setup_logging(self):
        self.logger = logging.getLogger('RustDetector')
        self.logger.setLevel(logging.INFO)
        handler = logging.StreamHandler()
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

    def calculate_texture_measure(self, gray_img):
        laplacian = cv2.Laplacian(gray_img, cv2.CV_64F)
        return laplacian.var()

    def get_severity_color_and_message(self, severity):
        """Get color and message based on severity level"""
        if severity > 60:
            return (255, 0, 0), "EXTREMELY HIGH RUSTING"  # Blue
        elif severity > 50:
            return (255, 255, 0), "HIGH RUSTING"  # Yellow
        else:
            return (0, 0, 255), "MODERATE RUSTING"  # Red

    def show_alert(self, frame, severity):
        """Display alert message based on rust severity"""
        current_time = datetime.datetime.now()
        if (current_time - self.last_alert_time).total_seconds() < self.alert_cooldown:
            return frame

        color, message = self.get_severity_color_and_message(severity)
        
        # Add semi-transparent overlay for alert
        overlay = frame.copy()
        cv2.rectangle(overlay, (0, 0), (frame.shape[1], 60), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.3, frame, 0.7, 0, frame)
        
        # Add alert text
        cv2.putText(frame, f"{message} DETECTED!", (20, 40),
                   cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
        
        self.last_alert_time = current_time
        print(f"Warning: {message} detected!")
        
        return frame

    def detect_rust(self, frame):
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        
        mask1 = cv2.inRange(hsv, self.rust_lower, self.rust_upper)
        mask2 = cv2.inRange(hsv, self.rust_lower2, self.rust_upper2)
        mask3 = cv2.inRange(hsv, self.rust_lower3, self.rust_upper3)
        
        mask = cv2.bitwise_or(cv2.bitwise_or(mask1, mask2), mask3)
        
        kernel = np.ones((3,3), np.uint8)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        output = frame.copy()
        
        detected_regions = []
        max_severity = 0
        
        for contour in contours:
            area = cv2.contourArea(contour)
            
            if area > self.min_area:
                contour_mask = np.zeros_like(gray)
                cv2.drawContours(contour_mask, [contour], -1, (255), -1)
                
                x, y, w, h = cv2.boundingRect(contour)
                roi_gray = gray[y:y+h, x:x+w]
                
                texture_measure = self.calculate_texture_measure(roi_gray)
                
                if texture_measure > self.texture_threshold:
                    roi_hsv = hsv[y:y+h, x:x+w]
                    avg_saturation = np.mean(roi_hsv[:, :, 1])
                    
                    if avg_saturation < 60:
                        continue
                    
                    area_factor = min(100, (area / (frame.shape[0] * frame.shape[1]) * 2000))
                    texture_factor = min(100, texture_measure / 30)
                    severity = min(100, int((area_factor + texture_factor) / 2) + 40)
                    
                    # Update max severity
                    max_severity = max(max_severity, severity)
                    
                    # Get color based on severity
                    color, _ = self.get_severity_color_and_message(severity)
                    
                    cv2.drawContours(output, [contour], -1, color, 2)
                    cv2.putText(output, f'Rust: {severity}%', (x, y-10),
                              cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
                    
                    detected_regions.append({
                        'area': area,
                        'severity': severity,
                        'location': (x, y, w, h)
                    })
        
        # Add alert if rust is detected
        if max_severity > 0:
            output = self.show_alert(output, max_severity)
        
        return output, detected_regions

    def run_detection(self):
        print("Ya its working")
        cap = cv2.VideoCapture(0)
        
        if not cap.isOpened():
            self.logger.error("Failed to open webcam")
            return

        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

        self.logger.info("Starting detection... Press 'q' to quit, 's' to save current frame")
        
        while True:
            ret, frame = cap.read()
            if not ret:
                self.logger.warning("Failed to read frame")
                break

            processed_frame, detections = self.detect_rust(frame)
            
            cv2.imshow('Rust Detection', processed_frame)

            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
            elif key == ord('s') and len(detections) > 0:
                self.save_detection(processed_frame)

        cap.release()
        cv2.destroyAllWindows()

    def save_detection(self, frame):
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = self.output_dir / f"rust_detection_{timestamp}.jpg"
        cv2.imwrite(str(filename), frame)
        self.logger.info(f"Detection saved to {filename}")

if __name__ == "_main_":
    detector = RustDetector()
    detector.run_detection()