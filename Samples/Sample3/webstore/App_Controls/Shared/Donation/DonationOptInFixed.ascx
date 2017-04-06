<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DonationOptInFixed.ascx.cs" Inherits="Gateway.Web.UI.Controls.Donation.DonationOptInFixed" %>
<asp:Panel ID="DonationOptInFixedPlaceHolder" DefaultButton="DonationOptInFixedButton" CssClass="donationOptInFixedBlock blockDisplay" runat="server">
	<asp:Label ID="DonationOptInFixedDescriptionLabel" CssClass="donationDescription" runat="server" />
	<asp:Label ID="DonationOptInFixedInfoLabel" CssClass="donationInfo" runat="server" />
	<asp:Button ID="DonationOptInFixedButton" CssClass="donationButton" runat="server" CausesValidation="false" OnClick="DonationOptInFixedButton_Click" />
</asp:Panel>