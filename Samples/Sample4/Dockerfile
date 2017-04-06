FROM microsoft/windowsservercore
ARG source=./POS
WORKDIR /app
EXPOSE 2003
COPY $source .
ENTRYPOINT ["POSServiceConsole.exe"]