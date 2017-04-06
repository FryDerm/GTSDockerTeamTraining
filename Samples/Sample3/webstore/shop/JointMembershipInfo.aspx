<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="JointMembershipInfo.aspx.cs" Inherits="Gateway.WebStore.shop.JointMembershipInfo" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<%@ Reference Control="~/masterpage.master" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register src="../App_Controls/Shared/JointMembership/AdditionalMembersControl.ascx" tagname="AdditionalMembersControl" tagprefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />      
    <uc1:AdditionalMembersControl ID="AdditionalMembersControl" runat="server" /> 
</asp:Content>
