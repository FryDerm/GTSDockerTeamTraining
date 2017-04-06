<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ScheduleDetail.ascx.cs" Inherits="Gateway.WebStore.Transportation.ScheduleDetail" %>
<%@ Register src="CarriersSummary.ascx" tagname="CarriersSummary" tagprefix="uc1" %>
<%@ Register Src="ItineraryDisplay.ascx" TagName="ItineraryDisplay" TagPrefix="uc1" %>

<div id="ScheduleDetail">
    <div class="TabDescriptionLabel">        
		<asp:Literal ID="ScheduleDetailDescriptionLiteral" runat="server" />		        
    </div>
    <div class="scheduleDetailScroll">
    <div id="ScheduleDetailBody">
        <uc1:ItineraryDisplay ID="ScheduleDetailsItineraryDisplay" runat="server" DisplayMode="Normal" />
        <br />
        <asp:Repeater ID="DetailRepeater" runat="server" OnItemDataBound="DetailRepeater_ItemDataBound">
            <HeaderTemplate>
                <div class="TableLabel"><asp:Literal ID="DetailDescriptionLiteral" runat="server" /></div>
                
                <div class="scrollDiv">
                <table id="DetailTable" cellpadding="0" cellspacing="0" >                    
                    <tr id="DetailHeader">
                        <th class="SchedColumnCell"><asp:Literal ID="DetailScheduleHeaderLabel" runat="server" /></th>
                        <th class="StopsColumnCell"><asp:Literal ID="DetailStopsHeaderLabel" runat="server" /></th>
                        <th class="LeavesColumnCell"><asp:Literal ID="DetailLeaveHeaderLabel" runat="server" /></th>
                        <th class="ArrivesColumnCell"><asp:Literal ID="DetailArriveHeaderLabel" runat="server" /></th>
                        <th class="LayoverColumnCell"><asp:Literal ID="DetailLayoverHeaderLabel" runat="server" /></th>
                    </tr>
            </HeaderTemplate>
            <ItemTemplate>
                <tr>
                    <td class="SchedColumnCell"><asp:Label ID="DetailSchedule" runat="server" /></td>
                    <td class="StopsColumnCell"><asp:Label ID="DetailStops" runat="server" /></td>
                    <td class="LeavesColumnCell"><asp:Label ID="DetailLeave" runat="server" /></td>
                    <td class="ArrivesColumnCell"><asp:Label ID="DetailArrive" runat="server" /></td>
                    <td class="LayoverColumnCell"><asp:Label ID="DetailLayover" runat="server" /></td>
                </tr>                
            </ItemTemplate>
            <AlternatingItemTemplate>
                <tr>
                    <td class="SchedColumnCell"><asp:Label ID="DetailSchedule" runat="server" /></td>
                    <td class="StopsColumnCell"><asp:Label ID="DetailStops" runat="server" /></td>
                    <td class="LeavesColumnCell"><asp:Label ID="DetailLeave" runat="server" /></td>
                    <td class="ArrivesColumnCell"><asp:Label ID="DetailArrive" runat="server" /></td>
                    <td class="LayoverColumnCell"><asp:Label ID="DetailLayover" runat="server" /></td>
                </tr>                
            </AlternatingItemTemplate>
            <FooterTemplate>
                </table>
                </div>
            </FooterTemplate>
        </asp:Repeater>
        <br />
        <uc1:CarriersSummary ID="CarriersListSummary" runat="server" />
    </div>
    </div>
</div>

