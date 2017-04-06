<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ManualReplenish.aspx.cs" Inherits="Gateway.WebStore.account.ManualReplenish" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <div id="ManualReplenish">
        <br />
		<table id="ReplenishReceipt" runat="server" width="100%" visible="false" cellpadding="2" cellspacing="0">
			<tr>
				<td><asp:Literal ID="ReceiptCardNumberLiteral" runat="server" /></td>
				<td><asp:Literal id="ReceiptCardNumberValueLiteral" runat="server" /></td>
			</tr>
			<tr>
				<td><asp:Literal ID="ReceiptAmountLiteral" runat="server" /></td>
				<td><asp:Literal id="ReceiptAmountValueLiteral" runat="server" /></td>
			</tr>
			<tr>
				<td><asp:Literal ID="ReceiptAuthCodeLiteral" runat="server" /></td>
				<td><asp:Literal id="ReceiptAuthCodeValueLiteral" runat="server" /></td>
			</tr>
		</table>
    </div>
</asp:Content>