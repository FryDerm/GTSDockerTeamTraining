<%@ Page Language="C#" AutoEventWireup="true" Inherits="Gateway.Web.UI.Pages.CVVPopUp" Codebehind="CVVPopUp.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//Dtd XHTML 1.0 transitional//EN" "http://www.w3.org/tr/xhtml1/Dtd/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head" runat="server">
    <title></title>
</head>
<body>
    <form id="MainForm" runat="server">
		<div id="CVVPopUp">
			<table cellpadding="2" cellspacing="0" >
				<tr>
					<td><asp:Label ID="CVVLabel" runat="server" /></td>
					<td class="text-right"><asp:Button ID="CloseButton" runat="server" OnClientClick="javascript:window.close();" /></td>
				</tr>
				<tr>
					<td colspan="2"><hr size="1" noshade /></td>
				</tr>
				<tr>
					<td colspan="2"><asp:Label ID="CVVInfoLabel" runat="server" /><br /></td>
				</tr>
				<tr>
					<td><img src="~/images/GTS/cvv-visa-mc-discover.gif" width="268" height="178" id="CVVVisaMCDiscoverImage" runat="server" /></td>
					<td>
						<asp:Label ID="VisaMCDiscoverNameLabel" runat="server" Font-Bold="true" /><br />
						<asp:Label ID="VisaMCDiscoverInfoLabel" runat="server" />
					</td>
				</tr>
				<tr>
					<td><img src="../images/GTS/cvv-amex.gif" width="268" height="178" id="CVVAmexImage" runat="server" /></td>
					<td>
						<asp:Label ID="AmexNameLabel" runat="server" Font-Bold="true" /><br />
						<asp:Label ID="AmexInfoLabel" runat="server" />
					</td>
				</tr>
			</table>
		</div>
    </form>
</body>
</html>