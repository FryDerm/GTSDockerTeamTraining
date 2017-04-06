<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="Gateway.WebStore.account.ChangePassword" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register src="../App_Controls/ChangePassword.ascx" tagname="ChangePassword" tagprefix="uc1" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    
    <div data-replace="ChangePassword">

        <uc1:ChangePassword ID="ChangePasswordControl" runat="server" 
		    AuthenticateType="eGalaxy"
            OnChangePasswordNotification="ChangePasswordControl_ChangePasswordNotification" />
        
    </div>
    
    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/changePassword.html") %>

</asp:Content>