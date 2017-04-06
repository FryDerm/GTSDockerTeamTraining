<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="LoyaltySelector.aspx.cs" Inherits="Gateway.WebStore.LoyaltyPrograms.LoyaltySelector" %>
<%@ Register Src="../App_Controls/LoyaltySelectorControl.ascx" TagName="LoyaltySelectorControl" TagPrefix="uc1" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
	<div id="LoyaltyProgramSelection">
		<uc1:LoyaltySelectorControl ID="LoyaltySelectorControl"
			runat="server"
			OnEnrollmentSuccessful="LoyaltySelectorControl_EnrollmentSuccessful"
			OnEnrollmentFailed="LoyaltySelectorControl_EnrollmentFailed"
			OnCancel="LoyaltySelectorControl_Cancel" />
	</div>
    
    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/loyaltySelector.html") %>

</asp:Content>