docker build -t portalcontainer.azurecr.io/node-portal-app:latest .
docker login portalcontainer.azurecr.io --username portalcontainer --password FIY=e700SttuJt3Hy2kL8SqXRsEfrCrr
docker push portalcontainer.azurecr.io/node-portal-app:latest
docker rmi portalcontainer.azurecr.io/node-portal-app:latest
pause