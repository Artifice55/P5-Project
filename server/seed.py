import json

from random import randint, choice as rc
from datetime import time 

from faker import Faker
# f = open('db.json')

# data = json.load(f)

# json_patients = data['patients']

from app import app, db
from models import db, Therapist, Patient, Session, Appointment 

faker = Faker()
Therapists = ['Dr. Smith', 'Dr. Miller' 'Dr. Kane', 'Dr, Muller', 'Dr. Modrić', 'Dr. Beaulo']
Patients  = ['Oliver Johnson', 'Maya Patel', 'Elijah Carter', 'Sophia Ramirez', 'Liam Anderson', 'Ava Thompson', 'Noah Lewis', 'Isabella Nguyen', 'Benjamin Walker', 'Mia Garcia', 'Lucas Robinson', 'Emily Martinez']
Session_duration = ['30 Minutes', '45 Minutes', '1 Hour']
Appointment_status = ['Confirmed', 'Pending', 'Cancelled']
gender = ['Male', 'Female', 'Other']
reasons = ['Depression', 'Anxiety', 'Self-Harm', 'Poor HouseHold Conditions', 'Poor Relationship with parents', 'Anger Issues']
start = ['9:00am', '10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm', ]
end = ['9:45am','10:45am','11:45am','12:45pm','1:45pm', '2:45pm','3:45pm','4:45pm']


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db")
        Therapist.query.delete()
        Patient.query.delete()
        Session.query.delete()
        Appointment.query.delete()

        print("Starting seed...")
    

        def create_therapists():
            therapists = [Therapist(username=doctor, password=fake.password(),
            date_of_birth=fake.date_of_birth(),email=fake.email(),
            phone_number=fake.phone_number(),
            address=fake.address(),city=fake.city(), 
            state=fake.state()) for doctor in Therapists]
            
            db.session.add_all(therapists)
            db.session.commit()
            
            return therapists


        therapists = create_therapists()
        print("Creating Therapist")

        def create_patients():
            patients = [Patient(username=person,password=fake.password(), 
            gender=rc(gender), date_of_birth=fake.date_of_birth(),
            email=fake.email(), 
            phone_number=fake.phone_number(), 
            reason_for_therapy=rc(reasons)) for person in Patients]

            db.session.add_all(patients)
            db.session.commit()

            return patients
        
        patients = create_patients()
        print("Creating Patients")

        
        def create_sessions():
            sessions = [Session(therapist_id=rc([therapist.id for therapist in therapists]),
            patient_id=rc([patient.id for patient in patients]),
            date=fake.date(), 
            start_time=rc(start), 
            end_time=rc(end),
            duration=duration) for duration in Session_duration]
            
            db.session.add_all(sessions)
            db.session.commit()
            

            return sessions
            
        sessions = create_sessions()
        print("Creating Sessions")    


        def create_appointments():
                appointments = []
                for _ in range(10):
                    appointment = Appointment(
                        status=rc(Appointment_status),
                        therapist_id=rc([therapist.id for therapist in therapists]),
                        patient_id=rc([patient.id for patient in patients]),
                        date=fake.date_between(start_date='-1y', end_date='+1y'),
                        start_time=rc(start),
                        end_time=rc(end)
                    )
                    appointments.append(appointment)
                    db.session.add(appointment)
                db.session.commit()
                return appointments
        appointments = create_appointments()
        print("Creating Appointments")

    # f.close()