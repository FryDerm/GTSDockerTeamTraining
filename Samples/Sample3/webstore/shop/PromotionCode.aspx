<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.PromotionCode" Title="Untitled Page" Codebehind="PromotionCode.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register Src="../App_Controls/PromotionOfferValidator.ascx" TagName="PromotionOfferValidator" TagPrefix="uc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div data-replace="PromotionCode">
		<uc1:PromotionOfferValidator ID="PromotionOfferValidator1" OnOfferValidated="OfferValidated" OnOfferRejected="OfferRejected"  runat="server" />
	</div>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/promotion.html") %>
</asp:Content>