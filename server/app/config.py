from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_password: str
    database_username: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    cloud_name: str
    api_key: str
    api_secret: str

    class Config:
        env_file = ".env"


settings = Settings()
