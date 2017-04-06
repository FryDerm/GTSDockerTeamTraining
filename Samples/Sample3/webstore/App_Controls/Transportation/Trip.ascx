<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Trip.ascx.cs" Inherits="Gateway.WebStore.Transportation.Trip" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<%@ Register src="ScheduleDetail.ascx" tagname="ScheduleDetail" tagprefix="uc1" %>
<%@ Register src="SchedulesDisplay.ascx" tagname="SchedulesDisplay" tagprefix="uc2" %>

<div id="ScheduleInfo">  
       <div class="TripSelectionWrapper">
            <div class="TripSelectionHeader">
                <asp:Literal ID="TripDescriptionLiteral" runat="server" />
            </div>            
            <div class="TripSelectionContent">
              <table id="TripSelectorTable">
                <tr>
                    <td><asp:Literal ID="OriginLiteral" runat="server" /></td>
                </tr>
                <tr>
                    <td><asp:DropDownList ID="OriginDropDownList" class="TripDropdownList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="OriginDropDownList_SelectedIndexChanged" OnPreRender="OriginDropDownList_PreRender" /></td>
                </tr>
                <tr>
                    <td><asp:Literal ID="DestinationLiteral" runat="server" /></td>
                </tr>
                <tr>
                    <td><asp:DropDownList ID="DestinationDropDownList" class="TripDropdownList" runat="server"  AutoPostBack="True" OnSelectedIndexChanged="DestinationDropDownList_SelectedIndexChanged" OnPreRender="DestinationDropDownList_PreRender" /></td>
                </tr>
             </table>
            </div>
             <div class="usermessage">
                     <asp:Literal ID="UserMessageLiteral" runat="server" />
                </div>
          </div>
    <asp:Panel ID="TripSchedulesPanel" runat="server">
        <cc1:TabContainer ID="TripScheduleTabContainer" runat="server" CssClass="TabContainer">
            <cc1:TabPanel ID="DepartureSchedulesTabPanel" runat="server" CssClass="Tab">
                <HeaderTemplate>
                    <asp:Literal ID="DepartureSchedulesTabHeaderLiteral" runat="server" />
                </HeaderTemplate>
                <ContentTemplate>
                    <div class="TabDescriptionLabel">
                        <asp:Label ID="DepartureDescription" runat="server" />
                    </div>
                    <div class="LinkButtons">
                        <a id="DepartCheckFares" href="~/transportation/ETickets.aspx" runat="server"><asp:Literal ID="DepartureCheckFaresLiteral" runat="server" /></a>
                        <a id="DepartViewSchedules" href="~/transportation/ViewSchedules.aspx" runat="server"><asp:Literal ID="DepartureViewAllSchedulesLiteral" runat="server" /></a>
                    </div>
                    <div class="IndicatorMessage"><asp:Literal ID="DepartureIndicatorMessageLiteral" runat="server" /></div>
                     <div class="SchedulesDisplayWrapper">
                        <uc2:SchedulesDisplay ID="DepartureSchedulesDisplay" DisplayMode="DisplayOnly" OnWebSchedClicked="WebSchedLinkButton_Click" runat="server" />
                    </div>
                </ContentTemplate>
            </cc1:TabPanel>
            <cc1:TabPanel ID="ReturnSchedulesTabPanel" runat="server" CssClass="Tab">
                <HeaderTemplate>
                    <asp:Literal ID="ReturnSchedulesTabHeaderLiteral" runat="server" />
                </HeaderTemplate>
                <ContentTemplate>
                    <div class="TripDescription">
                        <asp:Label ID="ReturnDescription" runat="server" />
                    </div>
                    <div class="LinkButtons">
                        <a id="ReturnCheckFares"  href="~/transportation/ETickets.aspx" runat="server"><asp:Literal ID="ReturnCheckFaresLiteral" runat="server" /></a>
                        <a id="ReturnViewSchedules" href="~/transportation/ViewSchedules.aspx" runat="server"><asp:Literal ID="ReturnViewAllSchedulesLiteral" runat="server" /></a>
                    </div>
                    <div class="IndicatorMessage"><asp:Literal ID="ReturnIndicatorMessageLiteral" runat="server" /></div>
                    <div class="SchedulesDisplayWrapper">
                        <uc2:SchedulesDisplay ID="ReturnSchedulesDisplay"  DisplayMode="DisplayOnly" OnWebSchedClicked="WebSchedLinkButton_Click" runat="server" />
                    </div>
                </ContentTemplate>
            </cc1:TabPanel>
        </cc1:TabContainer>
    </asp:Panel>
    <asp:Panel ID="ScheduleDetailPanel" runat="server" style="display: none;" CssClass="modalPopup">
        <div class="BackToTrip" style="float: right;">
            <asp:Button ID="ModalCloseButton" CssClass="ModalCloseButton" runat="server" OnClick="BackToTripButton_Click" />
        </div>
        <uc1:ScheduleDetail ID="ScheduleDetailControl" runat="server" />
        <div class="BackToTrip" style="float: right;">
            <asp:Button ID="BackToTripButton" Text="Back to your trip" runat="server" OnClick="BackToTripButton_Click" />
        </div>
    </asp:Panel>
    <asp:Button ID="HiddenButton" runat="server" style="display: none;" />
    <cc1:ModalPopupExtender ID="ScheduleDetailPanel_ModalPopupExtender" runat="server"
        TargetControlID="HiddenButton"
        PopupControlID="ScheduleDetailPanel"
        OkControlID="BackToTripButton"
        BackgroundCssClass="modalBackground" />
</div>
