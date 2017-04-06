<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DonationPrompt.ascx.cs" Inherits="Gateway.Web.UI.Controls.App_Controls.DonationPrompt" %>
<%@ Register src="DonationOptInRoundUp.ascx" tagname="DonationOptInRoundUp" tagprefix="uc1" %>
<%@ Register src="DonationOptInEditable.ascx" tagname="DonationOptInEditable" tagprefix="uc2" %>
<%@ Register src="DonationOptInFixed.ascx" tagname="DonationOptInFixed" tagprefix="uc3" %>
<%@ Register src="DonationOptOut.ascx" tagname="DonationOptOut" tagprefix="uc4" %>
<uc1:DonationOptInRoundUp ID="DonationOptInRoundUp" runat="server" Visible="false" />
<uc2:DonationOptInEditable ID="DonationOptInEditable" runat="server" Visible="false" />
<uc3:DonationOptInFixed ID="DonationOptInFixed" runat="server" Visible="false" />
<uc4:DonationOptOut ID="DonationOptOut" runat="server" Visible="false" />