<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DonationOptInEditable.ascx.cs" Inherits="Gateway.Web.UI.Controls.DonationOptInEditable" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ Register src="~/App_Controls/BrokenRulesControl.ascx" tagname="BrokenRulesControl" tagprefix="uc1" %>
<asp:Panel ID="DonationOptInEditablePlaceHolder" DefaultButton="DonationOptInEditableButton" CssClass="donationOptInEditableBlock blockDisplay" runat="server">
	<asp:Label ID="DonationOptInEditableDescriptionLabel" CssClass="donationDescription" runat="server" />
	<asp:Label ID="DonationOptInEditableInfoLabel" CssClass="donationInfo" runat="server" />
	<uc1:BrokenRulesControl ID="BrokenRulesControl" runat="server" />
	<cc1:NumericTextBox ID="PLUPriceTextBox" CssClass="pluPriceTextBox" Columns="4" AllowDecimal="true" DecimalPlaces="2" runat="server" />
	<asp:Button ID="DonationOptInEditableButton" CssClass="donationButton" runat="server" CausesValidation="false" OnClick="DonationOptInEditableButton_Click" />
</asp:Panel>