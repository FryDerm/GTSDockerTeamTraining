<%@ Page Language="C#" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.ItemDetailPopUp" Codebehind="ItemDetailPopUp.aspx.cs" %>
<%@ Register Src="../App_Controls/SalesChannelDetailPLUControl.ascx" TagName="SalesChannelDetailPLUControl" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
	<title></title>
</head>
<body id="HtmlBodyControl" runat="server">
	<form id="ItemDetailPopUpForm" runat="server">
		<asp:ScriptManager ID="ScriptManager1" runat="server" />
		<div id="ItemDetailsPopUp">
        
        <div class="content">
			<div class="container">
					<div class="MerchantName"><asp:Literal ID="MerchantNameLiteral" runat="server" /></div>
					<div class="CategoryName"><asp:Literal ID="CategoryNameLiteral" runat="server" /></div>

			</div>
            <div class="container">
			<uc1:SalesChannelDetailPLUControl ID="SalesChannelDetailPLUControl" runat="server" ReadOnly="true" DisplayCompleteDetailsLink="false" />
			<div id="PrintCloseButtonTable">

                     <div> <asp:Button ID="PrintButton" runat="server" OnClientClick="window.print();return false;" /> </div>

                     <div> <asp:Button ID="CloseButton" runat="server" OnClientClick="window.close();return false;" /> </div>

                </div>
            </div>
			</div>
		</div>
	</form>
</body>
</html>