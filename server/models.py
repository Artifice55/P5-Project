from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()

class Therapist(db.Model, SerializerMixin):
    __tablename__ = "Therapists_table"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    phoneNumber = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    dateOfBirth = db.Column(db.String)
    gender = db.Column(db.String)
    medical_id_num = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        """getter"""
        return self._password_hash

    @password_hash.setter
    def password_hash(self, new_pass):
        """setter"""
        pass_hash = bcrypt.generate_password_hash(new_pass)
        self._password_hash = pass_hash.decode('utf-8')

    sessions = db.relationship("Session", back_populates="therapist")
    appointments = db.relationship("Appointment", back_populates='therapist')

    serialize_rules = ("-sessions.therapist", "-appointments.therapist")


class Patient(db.Model, SerializerMixin):
    __tablename__ = "Patients_table"
     
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    gender = db.Column(db.String)
    dateOfBirth = db.Column(db.String)
    email = db.Column(db.String)
    phoneNumber = db.Column(db.String)
        
    @hybrid_property
    def password_hash(self):
        """getter"""
        return self._password_hash

    @password_hash.setter
    def password_hash(self, new_pass):
        """setter"""
        pass_hash = bcrypt.generate_password_hash(new_pass)
        self._password_hash = pass_hash.decode('utf-8')

    sessions = db.relationship("Session", back_populates="patient")
    appointments = db.relationship("Appointment", back_populates='patient')

    serialize_rules = ("-sessions.patient", "-appointment")

    

class Session(db.Model, SerializerMixin):
   __tablename__ = "sessions_table"
  
   id = db.Column(db.Integer, primary_key=True)
   therapist_id = db.Column(db.Integer, db.ForeignKey("Therapists_table.id"))
   patient_id = db.Column(db.Integer, db.ForeignKey("Patients_table.id"))
   date = db.Column(db.String)
   startTime = db.Column(db.String)
   endTime = db.Column(db.String)
   duration = db.Column(db.String)
   
   therapist = db.relationship("Therapist", back_populates="sessions")
   patient = db.relationship("Patient", back_populates="sessions")

   serialize_rules = ("-therapist.sessions", "-patient.sessions")


class Appointment(db.Model, SerializerMixin):  
    __tablename__ = "Appointments_table"

    id = db.Column(db.Integer, primary_key=True) 
    therapist_id = db.Column(db.Integer, db.ForeignKey("Therapists_table.id"))
    patient_id = db.Column(db.Integer, db.ForeignKey("Patients_table.id"))
    date = db.Column(db.String)
    startTime = db.Column(db.String)
    endTime = db.Column(db.String)
    name = db.Column(db.String)
    phoneNumber = db.Column(db.String)

    therapist = db.relationship("Therapist", back_populates="appointments")
    patient = db.relationship("Patient", back_populates="appointments")

    serialize_rules = ("-therapist.appointments", "-patient.appointments")

