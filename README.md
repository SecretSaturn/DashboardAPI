# Shade Kujira Adapter

This adapter uses unencrypted inputs for querying contracts and outputs unencrypted queries. 
This adapter is a quick and dirty made version - don't expect perfect behavior as from an LCD. 

## Installation

Follow these steps to install and run Shade Kujira Adapter.

### Prerequisites

- Git
- Node.js
- npm (Node Package Manager)

### Clone the Repository

Clone the repository to your local machine and navigate to the project directory:

```
bash
git clone https://github.com/SecretSaturn/FeeGrantFaucet2.0
cd FeeGrantFaucet2.0
```

### Install Dependencies
Install the necessary Node.js dependencies:

```npm install```

### Configure Environment Variables
Create a .env file in the root of the project directory. Use the .env.sample provided in the repository as a reference and fill in the necessary details.

### Run the Application
Start the application:

```npm run start```

### Docker setup

Requires latest docker version

$```
docker compose -f docker/docker-compose.yml build
docker compose -f docker/docker-compose.yml up
```

git config --global user.email "you@example.com"
  git config --global user.name "Your Name"