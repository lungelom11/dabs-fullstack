#Get single patient Schema
def one_patient(patient_data):
    return {
        "id": str(patient_data["_id"]),
        "firstname":patient_data["firstname"],
        "lastname":patient_data["lastname"],
        "email":patient_data["email"],
    }

#Get all patients Schema

def all_patients(patient_data):
    return [one_patient(patient) for patient in patient_data]