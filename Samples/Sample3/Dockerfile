# escape=`

FROM microsoft/iis

SHELL ["powershell", "-command"]

RUN Install-WindowsFeature NET-Framework-45-ASPNET; `
	Install-WindowsFeature Web-Asp-Net45;

EXPOSE 8000

RUN Import-module IISAdministration; 

RUN mkdir C:\site; `
	New-WebSite -Name 'Site' `
		-Port 8000 -PhysicalPath "C:\site" `
		-ApplicationPool '.NET v4.5'

RUN Import-module WebAdministration; `
	Set-ItemProperty ('IIS:\AppPools\.NET v4.5') -name "enable32BitAppOnWin64" -Value "true"; `
	Set-ItemProperty ('IIS:\AppPools\.NET v4.5') -name "managedRuntimeVersion" -Value "v4.0";
	
RUN & c:\windows\system32\inetsrv\appcmd.exe unlock config /section:system.webServer/handlers; 

ADD webstore/ /site

RUN regsvr32 /s c:\site\CartTrans070013.dll

RUN regsvr32 /s c:\site\WebPublishing070013.dll
