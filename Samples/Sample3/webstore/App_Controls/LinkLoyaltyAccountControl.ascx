<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LinkLoyaltyAccountControl.ascx.cs" Inherits="Gateway.WebStore.LinkLoyaltyAccountControl" %>
<div id="LinkLoyaltyAccount">
	<asp:LinkButton ID="LinkLoyaltyAccountLinkButton" runat="server" CssClass="LoyaltyLinkButton" OnClick="LinkLoyaltyAccountLinkButton_Click" />
	<asp:Label ID="LoyaltyProgramLinkFailedLabel" CssClass="message errorMessage" runat="server" Visible="false" />
	<asp:Panel ID="LinkLoyaltyAccountPanel" runat="server" DefaultButton="LinkLoyaltyAccountButton" Visible="false">
		<asp:Literal ID="LoyaltyAccountNumberLiteral" runat="server" />&nbsp;<asp:TextBox ID="LoyaltyAccountNumberTextBox" runat="server" />
		<asp:Button ID="LinkLoyaltyAccountButton" runat="server" OnClick="LinkLoyaltyAccountButton_Click" />
	</asp:Panel>
</div>