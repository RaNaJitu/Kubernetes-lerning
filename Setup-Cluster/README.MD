# Kubernetes Cluster Setup Guide
  - Kubeadm
  - Minikube
  - KIND Cluster
  - ESK/AKS/GKE

## 1. Installing KIND,Docker and kubectl SETUP in AWS EC2 server
Install Docker, KIND and kubectl
  - creat the script file name is install_docker_kind_kubctl.sh
  - paste the below code
  - chmode 777 install_docker_kind_kubctl.sh ↵
  - ./install_docker_kind_kubctl.sh ↵
  - sudo apt-get update ↵
  - sudo usermod -aG docker $USER && newgrp docker ↵


#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status
set -o pipefail

echo "🚀 Starting installation of Docker, Kind, and kubectl..."

# ----------------------------
# 1. Install Docker
# ----------------------------
if ! command -v docker &>/dev/null; then
  echo "📦 Installing Docker..."
  sudo apt-get update -y
  sudo apt-get install -y docker.io

  echo "👤 Adding current user to docker group..."
  sudo usermod -aG docker "$USER"

  echo "✅ Docker installed and user added to docker group."
else
  echo "✅ Docker is already installed."
fi

# ----------------------------
# 2. Install Kind (based on architecture)
# ----------------------------
if ! command -v kind &>/dev/null; then
  echo "📦 Installing Kind..."

  ARCH=$(uname -m)
  if [ "$ARCH" = "x86_64" ]; then
    curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.29.0/kind-linux-amd64
  elif [ "$ARCH" = "aarch64" ]; then
    curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.29.0/kind-linux-arm64
  else
    echo "❌ Unsupported architecture: $ARCH"
    exit 1
  fi

  chmod +x ./kind
  sudo mv ./kind /usr/local/bin/kind
  echo "✅ Kind installed successfully."
else
  echo "✅ Kind is already installed."
fi

# ----------------------------
# 3. Install kubectl (based on architecture)
# ----------------------------
if ! command -v kubectl &>/dev/null; then
  echo "📦 Installing kubectl (latest stable version)..."

  ARCH=$(uname -m)
  VERSION=$(curl -Ls https://dl.k8s.io/release/stable.txt)

  if [ "$ARCH" = "x86_64" ]; then
    curl -Lo ./kubectl "https://dl.k8s.io/release/${VERSION}/bin/linux/amd64/kubectl"
  elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
    curl -Lo ./kubectl "https://dl.k8s.io/release/${VERSION}/bin/linux/arm64/kubectl"
  else
    echo "❌ Unsupported architecture: $ARCH"
    exit 1
  fi

  chmod +x ./kubectl
  sudo mv ./kubectl /usr/local/bin/kubectl
  echo "✅ kubectl installed successfully."
else
  echo "✅ kubectl is already installed."
fi

# ----------------------------
# 4. Confirm Versions
# ----------------------------
echo
echo "🔍 Installed Versions:"
docker --version
kind --version
kubectl version --client --output=yaml

echo
echo "🎉 Docker, Kind, and kubectl installation complete!"



# Minikube Installation Guide for Ubuntu

This guide provides step-by-step instructions for installing Minikube on Ubuntu. Minikube allows you to run a single-node Kubernetes cluster locally for development and testing purposes.

## Pre-requisites

* Ubuntu OS
* sudo privileges
* Internet access
* Virtualization support enabled (Check with `egrep -c '(vmx|svm)' /proc/cpuinfo`, 0=disabled 1=enabled) 

---

## Step 1: Update System Packages

Update your package lists to make sure you are getting the latest version and dependencies.

```bash
sudo apt update
```

<kbd>![image](https://github.com/paragpallavsingh/kubernetes-kickstarter/assets/40052830/57f1c5d9-474a-43b8-90b9-fe542e122f3f)</kbd>


## Step 2: Install Required Packages

Install some basic required packages.

```bash
sudo apt install -y curl wget apt-transport-https
```

<kbd>![image](https://github.com/paragpallavsingh/kubernetes-kickstarter/assets/40052830/84ad8474-8d4d-4d4b-a04d-def88f76dc9a)</kbd>

---

## Step 3: Install Docker

Minikube can run a Kubernetes cluster either in a VM or locally via Docker. This guide demonstrates the Docker method.

```bash
sudo apt install -y docker.io
```
<kbd>![image](https://github.com/paragpallavsingh/kubernetes-kickstarter/assets/40052830/d261f75b-a22f-4510-b3a3-14e1cecaf3e1)</kbd>


Start and enable Docker.

```bash
sudo systemctl enable --now docker
```

Add current user to docker group (To use docker without root)

```bash
sudo usermod -aG docker $USER && newgrp docker
```
Now, logout (use `exit` command) and connect again.

---

## Step 4: Install Minikube

First, download the Minikube binary using `curl`:

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```

Make it executable and move it into your path:

```bash
chmod +x minikube
sudo mv minikube /usr/local/bin/
```

<kbd>![image](https://github.com/paragpallavsingh/kubernetes-kickstarter/assets/40052830/80e8a137-286a-4334-886b-ea4821f596b2)</kbd>

---

## Step 5: Install kubectl

Download kubectl, which is a Kubernetes command-line tool.

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```
**Check above image ⬆️**
Make it executable and move it into your path:

```bash
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```
<kbd>![image](https://github.com/paragpallavsingh/kubernetes-kickstarter/assets/40052830/cdda6c84-f6c9-4d05-87e0-ed8627e46a3a)</kbd>

---

## Step 6: Start Minikube

Now, you can start Minikube with the following command:

```bash
minikube start --driver=docker --vm=true 
```

This command will start a single-node Kubernetes cluster inside a Docker container.

---

## Step 7: Check Cluster Status

Check the cluster status with:

```bash
minikube status
```

<kbd>![image](https://github.com/paragpallavsingh/kubernetes-kickstarter/assets/40052830/a2dabec8-b073-4e1e-a831-dd6845000230)</kbd>


You can also use `kubectl` to interact with your cluster:

```bash
kubectl get nodes
```

---

## Step 8: Stop Minikube

When you are done, you can stop the Minikube cluster with:

```bash
minikube stop
```

---

## Optional: Delete Minikube Cluster

If you wish to delete the Minikube cluster entirely, you can do so with:

```bash
minikube delete
```

---

That's it! You've successfully installed Minikube on Ubuntu, and you can now start deploying Kubernetes applications for development and testing.
```

---





# Minikube Installation on Windows/local System.

This guide provides step-by-step instructions for installing Minikube on windows with pre-requisites. Minikube allows you to run a single-node Kubernetes cluster locally for development and testing purposes.


## Pre-requisites

- Windows os
- Internet connection
- Container manager : Docker
- kubernetes cmd : kubectl


## Step 1: Docker Installation
visit the below link 
to download and install the docker desktop.

```bash
  https://docs.docker.com/desktop/install/windows-install/
```
 ## It will require a RESTART.
Now open cmd and check installation.

```bash
  docker --version


  output:
  Docker version 27.0.3, build 7d4bcd8
```
successfully installed docker on windows.

## Step 2: Minikube Installation

Now open poweshell and run below 2 commands.
```bash
New-Item -Path 'c:\' -Name 'minikube' -ItemType Directory -Force
Invoke-WebRequest -OutFile 'c:\minikube\minikube.exe' -Uri 'https://github.com/kubernetes/minikube/releases/latest/download/minikube-windows-amd64.exe' -UseBasicParsing

```
```bash
$oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine)
if ($oldPath.Split(';') -inotcontains 'C:\minikube'){
  [Environment]::SetEnvironmentVariable('Path', $('{0};C:\minikube' -f $oldPath), [EnvironmentVariableTarget]::Machine)
}
```
check the installation by 
```bash
minikube version


output:
minikube version: v1.33.1
commit: 5883c09216182566a63dff4c326a6fc9ed2982ff
```

## Step 3: Run Minikube 
- Open powershell run below cmd to create brand new cluster.
```bash
minikube start
```
## Step 4: Install kubectl With Curl
- Open powershell run below command to interact with your brand new cluster.
- Install curl if not availabe bydefault it is present.
```bash
curl.exe -LO "https://dl.k8s.io/release/v1.30.0/bin/windows/amd64/kubectl.exe"
```
## Step 5: Play With Your Cluster.

```bash
kubectl get nodes


output: 
NAME       STATUS   ROLES           AGE     VERSION
minikube   Ready    control-plane   3m54s   v1.30.0
```
This shows your single node cluster in up and running.

## Step 6: Don't Forget to Stop & Delete Minikube.
When you are done, you can stop the Minikube cluster with:
```bash
minikube stop
```
If you wish to delete the Minikube cluster entirely, you can do so with:
```bash
minikube delete
```

That's it! You've successfully installed Minikube on Windows, and you can now start deploying Kubernetes applications for development and testing.










   
