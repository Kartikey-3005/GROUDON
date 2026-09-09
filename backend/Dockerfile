FROM python:3.11-slim

# Create a non-root user with UID 1000 (standard requirement for Hugging Face Spaces)
RUN useradd -m -u 1000 user

WORKDIR /app

# Install dependencies as root
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy all application files
COPY --chown=user:user . /app

# Switch to the non-root user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    PYTHONUNBUFFERED=1

# Expose standard Hugging Face Spaces port
EXPOSE 7860

# Launch FastAPI app on port 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
