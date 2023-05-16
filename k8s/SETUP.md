minikube start --driver=hyperv --disk-size='8000mb' --cpus='2'
minikube addons enable ingress
minikube start --driver=virtualbox --disk-size='8000mb' --cpus='2' --no-vtx-check
