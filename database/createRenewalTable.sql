-- Create renewal_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS renewal_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    issue_id INT NOT NULL,
    student_id VARCHAR(20),
    book_id VARCHAR(20),
    title VARCHAR(150),
    author VARCHAR(100),
    current_due_date DATE,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    approved_by VARCHAR(50),
    approved_at TIMESTAMP NULL,
    rejection_reason TEXT,
    FOREIGN KEY (issue_id) REFERENCES issued_books(issue_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);
