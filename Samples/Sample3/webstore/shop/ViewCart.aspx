<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" EnableEventValidation="false" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.ViewCart" Title="Untitled Page" Codebehind="ViewCart.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Src="../App_Controls/LoyaltyAccountControl.ascx" TagName="LoyaltyAccountControl" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/Cart.ascx" TagName="Cart" TagPrefix="uc2" %>
<%@ Register Src="../App_Controls/CartSmall.ascx" TagName="CartSmall" TagPrefix="uc3" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="ViewCart">
        
        <uc3:CartSmall ID="CartSmall" runat="server" />

		<cc1:HtmlContent ID="ViewCartHtmlContent" Kind="ViewCart" runat="server" />

		<uc1:LoyaltyAccountControl
			ID="LoyaltyAccountControl"
			runat="server"
			Visible="false"
			OnLoyaltyAccountValidated="LoyaltyAccountControl_LoyaltyChanged"
			OnLoyaltyAccountValidationFailed="LoyaltyAccountControl_LoyaltyAccountValidationFailed"
			OnLoyaltyModeChanged="LoyaltyAccountControl_LoyaltyChanged"
			OnLoyaltyModeFailed="LoyaltyAccountControl_LoyaltyModeFailed"
			OnLoyaltyProgramCleared="LoyaltyAccountControl_LoyaltyChanged" />
		<uc2:Cart ID="Cart"
			ReadOnly="false"
			runat="server" 
            OnErrorNotification="Cart_ErrorNotification"
            OnWarningNotification="Cart_WarningNotification"
			OnCheckOut="Cart_OnCheckout" />
	</div>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/cart.html") %>
</asp:Content>