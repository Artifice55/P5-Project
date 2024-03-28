from flask import request, session
from models import db, Therapist, Patient, Session, Appointment
from flask_bcrypt import Bcrypt
from twilio.rest import Client
import os 
from dotenv import load_dotenv

from config import create_app, db

load_dotenv()
app = create_app()
bcrypt = Bcrypt(app)

account_sid = os.environ.get('ACCOUNT_SID')
auth_token = os.environ.get('AUTH_TOKEN')
twilio_phone_number = os.environ.get('TWILIO_PHONE_NUMBER')


client = Client(account_sid, auth_token)

@app.route('/send-sms', methods=['POST'])
def send_sms():
    phone_number = request.json['phoneNumber']
    message = client.messages.create(
        body='Your appointment has been scheduled. Thank you!',
        from_=twilio_phone_number,
        to=phone_number
    )
    return 'SMS sent successfully'

@app.route('/api')
def index():
    return '<h1>Phase-5-Project</h1>'

@app.get('/api/check_session')
def check_session():
    user_id = session.get('user_id')
    user = Patient.query.where(Patient.id == user_id).first()
    if user:
        return user.to_dict(), 200
    else:
        return {}, 200
    
@app.post('/api/login')
def login():
    data = request.json
    # NOTE: `.strip()` removes whitespace from either end of the input string,
    #       which is fine for debugging/testing but should be removed from production.
    username = data['username'].strip()
    _password_hash = data['_password_hash']
    
    
    patient = Patient.query.where(Patient.username == username).first()
    if patient and bcrypt.check_password_hash(patient._password_hash, _password_hash):
        session['user_id'] = patient.id    
        return patient.to_dict(), 201
    
    therapist = Therapist.query.where(Therapist.username == username).first()
    if therapist and bcrypt.check_password_hash(therapist._password_hash, _password_hash):
        session['user_id'] = therapist.id    
        return therapist.to_dict(), 201
    
    
    return {'error': 'Invalid username or password'}, 401
    
@app.delete('/api/logout')
def logout():
    session.pop('user_id')
    return {}, 204

@app.get('/api/patients')
def get_patients():
    all_patients = Patient.query.all()
    return [ patient.to_dict() for patient in all_patients], 200

@app.get('/api/patients/<int:id>')
def get_users_by_id(id):
    found_users = Patient.query.where(Patient.id ==id).first()
    if found_users:
        return found_users.to_dict(), 200
    else:
        return{'error': 'User not found.'}

@app.post('/api/patients')
def add_patients():
    data = request.json

    try:
        new_patient = Patient(username=data.get('username'),
        dateOfBirth=data.get('dateOfBirth'),
        email=data.get('email'), 
        phoneNumber=data.get('phoneNumber'), 
        gender=data.get('gender'),
        )
        new_patient.password_hash = data.get('_password_hash')
        db.session.add(new_patient)
        db.session.commit()

        return new_patient.to_dict(), 200
    except ValueError as error:
        return {'error': f'{error}'}, 400

@app.delete('/api/patients/<int:id>')
def delete_patients(id):
    found_users = Patient.query.where(Patient.id == id).first()

    if found_users:
        db.session.delete( found_users )
        db.session.commit()

        return {'successfully deleted'}, 204
    
    else: 
        return {'error' : 'NOT FOUND'}, 404

@app.get('/api/therapists')
def get_therapists():
    all_therapists = Therapist.query.all()
    return [ therapist.to_dict() for therapist in all_therapists], 200 

@app.get('/api/therapists/<int:id>')
def get_therapist_by_id(id):
    found_therapist = Therapist.query.where(Therapist.id == id ).first() 
    if found_therapist:
        return found_therapist.to_dict(), 200
    else: 
        return {'error': 'Therapist not found.'}   

@app.post('/api/therapists')
def post_therapist():
    data = request.json

    try:
        new_therapist = Therapist(username=data.get('username'),
        dateOfBirth=data.get('dateOfBirth'),
        email=data.get('email'), 
        phoneNumber=data.get('phoneNumber'), 
        gender=data.get('gender'),                          
        address=data.get('address'),
        city=data.get('city'),
        state=data.get('state'),                       
        medical_id_num=data.get('medical_id_num')
        )               
        new_therapist.password_hash = data.get('_password_hash')                        
        db.session.add(new_therapist)
        db.session.commit()

        return new_therapist.to_dict(), 200
    except ValueError as error:
        return {'error': f'{error}'}, 400

@app.post('/api/sessions')
def post_sessions():
    data = request.json

    try:
        new_sessions = Session(date=data.get('date'), startTime=data.get('startTime'), endTime=data.get('endTime'), phoneNumber=data.get('phoneNumber'))
        db.session.add(new_sessions)
        db.session.commit()
        return new_sessions.to_dict() , 200
    except ValueError as error:
        return{'error' f'{error}'}, 400 

@app.post('/api/appointments')
def post_appointments():
    data = request.json
    
    try:
         new_appointments = Appointment(name=data.get('name'), date=data.get('date'), startTime=data.get('startTime'), endTime=data.get('endTime'), phoneNumber=data.get('phoneNumber'))
         db.session.add(new_appointments)
         db.session.commit()
         
         return new_appointments.to_dict(), 200
    except ValueError as error:
        return {'error' f'{error }'}, 400
         
@app.patch('/api/appointments/<int:id>')
def patch_appointments(id): 
    print("============")
    data = request.json
    print(data)
    found_appointments = Appointment.query.where(Appointment.id == id).first()
    print(found_appointments)
     
    if found_appointments:
        try:
            for key in data:
                if key != 'id': 
                    setattr(found_appointments, key, data[key])
            db.session.commit()

            return found_appointments.to_dict(), 202
        
        except ValueError as error:
            return {'error': f'{error}'}, 406
    else:
        return {'error': "Appointment not found."}

@app.delete('/api/appointments/<int:id>')
def delete_appointment(id):
    found_appointments = Appointment.query.where(Appointment.id == id).first()

    if found_appointments:

        db.session.delete( found_appointments )
        db.session.commit()

        return {'successfully deleted'}, 204
        
    else:
        return {'error' : "NOT FOUND!"}, 404     






if __name__ == '__main__':
    app.run(port=5555, debug=True)

