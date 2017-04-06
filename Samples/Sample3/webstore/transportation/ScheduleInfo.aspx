<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ScheduleInfo.aspx.cs" Inherits="Gateway.WebStore.Transportation.ScheduleInfo"  %>
<%@ Register src="../App_Controls/Transportation/Trip.ascx" tagname="Trip" tagprefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" runat="server">

    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    <asp:UpdatePanel ID="ScheduleInfoUpdatePanel" runat="server">
    <ContentTemplate>
    	<uc1:Trip ID="TripControl" runat="server" />
    </ContentTemplate>
    </asp:UpdatePanel>
      <asp:UpdateProgress ID="UpdateProgress" runat="server" DynamicLayout="False" >
        <ProgressTemplate>
          <div class="updateProgressImage">
            <asp:Image ID="UpdateProgressImage" runat="server" ImageUrl="~/images/GTS/ajax-loading.gif" />
            <br /> <asp:Label ID="UpdateProgressLabel" runat="server" Text="Updating..."></asp:Label>
            </div>
          <div class="updateProgress">         
          </div>
        </ProgressTemplate>
      </asp:UpdateProgress>
</asp:Content>
