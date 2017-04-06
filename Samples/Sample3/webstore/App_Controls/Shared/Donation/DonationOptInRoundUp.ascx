<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DonationOptInRoundUp.ascx.cs" Inherits="Gateway.Web.UI.Controls.DonationOptInRoundUp" %>
<asp:Panel ID="DonationOptInRoundUpPlaceHolder" DefaultButton="DonationOptInRoundUpButton" CssClass="donationOptInRoundUpBlock blockDisplay" runat="server">
	<asp:Label ID="DonationOptInRoundUpDescriptionLabel" CssClass="donationDescription" runat="server" />
	<asp:Label ID="DonationOptInRoundUpInfoLabel" CssClass="donationInfo" runat="server" />
	<asp:Button ID="DonationOptInRoundUpButton" CssClass="donationButton" runat="server" OnClick="DonationOptInRoundUpButton_Click" />
</asp:Panel>