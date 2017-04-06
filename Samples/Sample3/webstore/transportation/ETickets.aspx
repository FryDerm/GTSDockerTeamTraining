<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ETickets.aspx.cs" Inherits="Gateway.WebStore.Transportation.ETickets" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register src="../App_Controls/Transportation/ETicketsSelector.ascx" tagname="ETicketsSelector" tagprefix="uc1" %>
<%@ Register src="../App_Controls/Transportation/ETicketsDetail.ascx" tagname="ETicketsDetail" tagprefix="uc2" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    <asp:Label ID="ErrorLabel" runat="server" />
    <div id="ETickets">
        <uc1:ETicketsSelector ID="ETicketsSelector1" runat="server" OnETicketsSelectorEventChanged="ETicketsSelectorControl_Changed" />
        <asp:Panel ID="SchedulesDetailsPanel" runat="server">
            <uc2:ETicketsDetail ID="ETicketsDetail1" runat="server" DetailMode="Normal" OnErrorNotification="ETicketsDetailControl_ErrorNotification" />
        </asp:Panel>
    </div>
</asp:Content>