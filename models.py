from pydantic import BaseModel


class SymptomRequest(BaseModel):
    text: str
    language: str = "en"
    age: int = 25
    sex: str = "male"


class EmergencyRequest(BaseModel):
    phone: str


class SchemeRequest(BaseModel):
    income: str
    area: str
