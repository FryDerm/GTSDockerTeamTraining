<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DeliveryMethodPopUp.aspx.cs" Inherits="Gateway.WebStore.checkout.DeliveryInfoPopUp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <form id="DeliveryMethodPopUpForm" runat="server">
        <div id="DeliveryMethodPopUp">
	        <table cellpadding="2" cellspacing="0" >
		        <tr>
			        <td>
			            <div id="DeliveryMethodInfoHeader">
			                <asp:Literal ID="DeliveryMethodNameLiteral" runat="server" />
			            </div>
			        </td>
				    <td class="text-right"><asp:Button ID="CloseButton" runat="server" OnClientClick="javascript:window.close();" /></td>
			    </tr>
			    <tr>
			        <td colspan="2">
    			        <div id="DeliveryMethodDescription">
			                <asp:Literal ID="LongDescriptionLiteral" runat="server" />
                        </div>			            
			        </td>
			    </tr>
            </table>
        </div>
    </form>
</body>
</html>