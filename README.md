# Payroll Slip Viewer  

This is a **Django-based** web application that allows employees to securely view their payroll slips. 
The payroll slips are stored in an **SQL Server database** and are retrieved dynamically without being stored as files.  

## Features  
- Secure employee authentication  
- Dynamic retrieval of payroll slips from **SQL Server**  
- No file storage – all payroll slips are fetched from the database  
- Responsive and user-friendly interface  

## Installation  

1. **Clone the repository:**  
   ```bash
   git clone git@github.com:Amirjahandar/payroll.git
   cd payroll
   ```  

2. **Create a virtual environment and install dependencies:**  
   ```bash
   python -m venv venv
   On Linux: source venv/bin/activate  
   On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```  

3. **Set up database connection:**  
   - Configure your **SQL Server** connection in `settings.py` under `DATABASES`.  

4. **Run migrations and start the server:**  
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```  

## Usage  
Deploy project on server, signup and login then you can check your payroll 

## License  
This project is licensed under the IPRCO License.  
