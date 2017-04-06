<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="MultiRide.aspx.cs" Inherits="Gateway.WebStore.Transportation.MultiRide" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<%@ Register src="../App_Controls/Transportation/ETicketsSelector.ascx" tagname="ETicketsSelector" tagprefix="uc1" %>
<%@ Register src="../App_Controls/Transportation/ETicketsDetail.ascx" tagname="ETicketsDetail" tagprefix="uc2" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <asp:UpdatePanel ID="ETicketUpdatePanel" runat="server">
        <ContentTemplate>
        <div id="MultiRide">
            <uc1:ETicketsSelector ID="ETicketsSelectorControl" runat="server" SelectorMode="Commuter" OnETicketsSelectorEventChanged="ETicketsSelectorControl_Changed"/>
            <asp:Panel ID="ETicketsDetailPanel" runat="server">
                <uc2:ETicketsDetail ID="ETicketsDetailControl" runat="server" DetailMode="Commuter" />
            </asp:Panel>
         </div>
        </ContentTemplate>
    </asp:UpdatePanel>
    <asp:UpdateProgress ID="UpdateProgress" runat="server" DynamicLayout="False" >
        <ProgressTemplate>
          <div class="updateProgressImage">
            <asp:Image ID="UpdateProgressImage" runat="server" ImageUrl="~/images/GTS/ajax-loading.gif" />
            <br /> <asp:Label ID="UpdateProgressLabel" runat="server" Text="Updating..."></asp:Label>
            </div>
          <div class="updateprogress">         
          </div>
        </ProgressTemplate>
      </asp:UpdateProgress>    
</asp:Content>
