<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PriceControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.PriceControl" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<span data-text="price"><asp:Literal ID="PLUPriceLiteral" runat="server" /></span>
<span data-el="priceHidden"><asp:HiddenField ID="PLUPriceHiddenField" runat="server" /></span>
<span data-el="editablePrice"><cc1:NumericTextBox ID="PLUPriceTextBox" CssClass="pluPriceTextBox" Columns="4" AllowDecimal="true" DecimalPlaces="2" runat="server" Visible="false" /></span>