<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PassInfoControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.PassInfoControl" %>

<table>
	<tr>
		<td><asp:Literal ID="NameValueLiteral" runat="server" /></td>
	</tr>
	<tr>
		<td><asp:Literal ID="PassTypeValueLiteral" runat="server" /></td>
	</tr>
	<tr id="ExpiresRow" runat="server">
		<td><asp:Literal ID="ExpiresLiteral" runat="server" />: <asp:Literal ID="ExpiresValueLiteral" runat="server" /></td>
	</tr>
    <tr id="RenewalPassRow" runat="server"
     Visible="false">
        <td><asp:Literal ID="RenewalPassLiteral" runat="server" /></td>
    </tr>
	<tr>
		<td><asp:Literal ID="PassIDLiteral" runat="server" />: <asp:Literal ID="PassIDValueLiteral" runat="server" /></td>
	</tr>
	<tr>
		<td><asp:Literal ID="StatusLiteral" runat="server" />: <asp:Literal ID="StatusValueLiteral" runat="server" /></td>
	</tr>
	<tr id="ContractTableRow" runat="server" visible="false">
		<td><asp:Literal ID="ContractLiteral" runat="server" />: <asp:Literal ID="ContractValueLiteral" runat="server" /></td>
	</tr>
	<tr id="ValidTodayTableRow" runat="server" visible="false">
		<td><asp:Literal ID="ValidTodayLiteral" runat="server" />&nbsp;<asp:Literal ID="ValidTodayValueLiteral" runat="server" /></td>
	</tr>
    <tr id="UpdateValueTableRow" runat="server" visible="false">
        <td><asp:Literal ID="UpgradeValueLiteral" runat="server" />: <asp:Literal ID="UpgradeValueValueLiteral" runat="server" /></td>
    </tr>
</table>

