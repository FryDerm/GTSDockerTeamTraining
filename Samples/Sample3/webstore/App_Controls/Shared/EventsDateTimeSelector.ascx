<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="EventsDateTimeSelector.ascx.cs" Inherits="Gateway.Web.UI.Controls.EventsDateTimeSelector" %>
<%@ Register Src="CalendarSelector.ascx" TagName="CalendarSelector" TagPrefix="uc1" %>
<div id="EventsDateTimeSelector">
	<table id="NoEventDatesTable" runat="server" visible="false">
		<tr>
			<td>
				<div id="NoEventDatesDisplay"><asp:Literal ID="NoEventDatesLiteral" runat="server" /></div>
			</td>
		</tr>
	</table>
	<table id="EventsTable" runat="server">
        
		<tr>
			<td valign="top">
				<table align="center" class="CalendarWithLegendTable">
					<tr>
						<td>
							<uc1:CalendarSelector
								ID="CalendarSelector"
								runat="server"
								OnDayRender="CalendarSelector_DayRender"
								OnMonthChanged="CalendarSelector_MonthChanged"
								OnSelectionChanged="CalendarSelector_SelectionChanged" />
						</td>
					</tr>
					<tr>
						<td align="center">
							<asp:Literal ID="CalendarLegendLiteral" runat="server" /><br />
							<table cellpadding="2" cellspacing="0" width="100%">
								<tr>
									<td>
										<table cellpadding="2" cellspacing="0" align="center">
											<tr>
												<td><div id="LegendAvailable"></div></td>
												<td><asp:Literal ID="AvailableLiteral" runat="server" /></td>
												<td><div id="LegendNoAvailability"></div></td>
												<td><asp:Literal ID="NoAvailabilityLiteral" runat="server" /></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
					
			</td>
			<td valign="top">
				<div id="EventTimes">
					<asp:Repeater ID="EventTimesRepeater" runat="server" OnItemDataBound="EventTimesRepeater_ItemDataBound">
						<HeaderTemplate>
						    
							<table cellpadding="6" cellspacing="0">
								<tr id="TopheaderRow">
                                    <td colspan="5">
                                        <asp:Literal ID="AvailabilityLiteral" runat="server" /><br />
				                        <span id="selected-eventdate">
                                            <asp:Literal ID="EventTimesDateLiteral" runat="server" />
                                        </span>
                                    </td>
                                </tr>
                                <tr id="HeaderRow">
									<th class="event-time-cell"><asp:Label ID="EventTimeHeaderLabel" runat="server" /></th>
                                    <th class="event-name-cell"><asp:Label ID="EventNameHeaderLabel" runat="server" /></th>
                                    <th class="availability-cell" ><asp:Literal ID="EventAvailabilityHeaderLiteral" runat="server" /></th>
                                    <th class="qty-cell" ><asp:Literal ID="AvailableQtyHeaderLiteral" runat="server" Visible="False" /></th>
                                    <th class="select-cell" >&nbsp;</th>
								</tr>
						</HeaderTemplate>
						<ItemTemplate>
							<tr id="EventTimeRow">
								<td class="event-time-cell text-right"><asp:Label ID="EventTimeLabel" runat="server" /></td>
								<td class="event-name-cell"><asp:Label ID="EventNameLabel" runat="server" /></td>
								<td class="availability-cell"><asp:Literal ID="EventAvailabilityLiteral" runat="server" /></td>
                                <td class="qty-cell"><asp:Literal ID="AvailableQtyLiteral" runat="server" Visible="False" /></td>
								<td class="select-cell"><asp:Button ID="SelectEventTimeButton" runat="server" OnClick="SelectEventTimeButton_Click" Visible="false" /></td>
							</tr>
							<tr id="EventAttributesRow" runat="server" visible="false" class="EventAttributesRow">
								<td></td>
								<td colspan="4">
									<div class="EventAttributesList">
										<asp:BulletedList ID="EventAttributesBulletedList" runat="server" />
									</div>
								</td>
							</tr>
						</ItemTemplate>
						<FooterTemplate>
							</table>
						</FooterTemplate>
					</asp:Repeater>
				</div>
				<table id="NoEventTimesTable" runat="server" visible="false">
					<tr>
						<td>
							<div id="NoEventTimesDisplay"><asp:Literal ID="NoEventTimesLiteral" runat="server" /></div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>		
</div>