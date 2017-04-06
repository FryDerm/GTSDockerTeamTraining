<%@ Page Language="C#" AutoEventWireup="true" Inherits="Gateway.WebStore.Checkout.PromotionPopup" Codebehind="PromotionPopup.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="ItemDetailPopUpForm" runat="server">
    <div data-replace="PromotionPopup">
		<table width="100%" height="100%">
			<tr>
				<td><span data-text="NameLabel"><asp:Label ID="NameLabel" runat="server" /></span></td>
			</tr>
			<tr>
				<td><span data-text="DescriptionLabel"><asp:Label ID="DescriptionLabel" runat="server" /></span></td>
			</tr>
			<tr>
				<td valign="top">
				    <span data-el="Image"><asp:Image ID="HelpImage" runat="server" /></span>
				</td>
			</tr>
			<tr>
				<td>
					<table width="100%">
						<tr>
							<td align="center">
								<asp:Button ID="PrintButton" runat="server" OnClientClick="window.print();return false;" />
							</td>
							<td align="center">
								<asp:Button ID="CloseButton" runat="server" OnClientClick="window.close();return false;" />
							</td>
						</tr>
					</table>				
				</td>
			</tr>
		</table>
    </div>
    </form>
</body>
</html>
