<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Checkout.ShippingInfo" Title="Untitled Page" Codebehind="ShippingInfo.aspx.cs" %>
<%@ Register Src="../App_Controls/CustContactsForm.ascx" TagName="CustContactsForm" TagPrefix="uc1" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <div id="ChangeShippingButton">
        <asp:Button ID="UseDifferentShippingAddressButton" runat="server" OnClick="UseDifferentShippingAddressButton_Click" Visible="False" />
    </div>
	<div id="ShippingInfo">
		<cc1:HtmlContent ID="ReviewOrderHtmlContent" Kind="ShippingInfo" runat="server" />
		<uc1:CustContactsForm ID="CustContactsForm" runat="server" />
		<asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" />
	</div>
</asp:Content>