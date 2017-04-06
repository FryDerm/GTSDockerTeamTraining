<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MultiTimeEventsSelector.ascx.cs" Inherits="Gateway.Web.UI.Controls.MultiTimeEventsSelector" %>
<%@ Register src="CalendarSelector.ascx" tagname="CalendarSelector" tagprefix="uc1" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc2" %>



<div id="MultiTimeEventsSelector">
	<table id="NoEventDatesTable" runat="server" visible="false">
		<tr>
			<td>
				<div id="NoEventDatesDisplay"><asp:Literal ID="NoEventDatesLiteral" runat="server" /></div>
			</td>
		</tr>
	</table>
	<table id="MultiTimeEventsTable" runat="server">
		<tr>
			<td valign="top">
				<table align="center" class="CalendarWithLegendTable" cellpadding="0" cellspacing="0">
                    <tr>
                    <td><asp:Label ID="CalendarHeader" runat="server" CssClass="CalendarHeader" Text="Select Date"></asp:Label></td>
                    </tr>
					<tr>
						<td>  
							<uc1:CalendarSelector ID="MultiTimeCalendarSelector" 
													runat="server"
													OnDayRender="MultiTimeCalendarSelector_DayRender"
													OnMonthChanged="MultiTimeCalendarSelector_MonthChanged"
													OnSelectionChanged="MultiTimeCalendarSelector_SelectionChanged" />                     
							
						</td>
					</tr>
					<tr>
						<td align="center" >
							<asp:Literal ID="CalendarLegendLiteral" runat="server" /><br />
							<table cellpadding="2" cellspacing="0" width="100%">
								<tr>
									<td>
										<table cellpadding="2" cellspacing="0" align="center" id="calendar-legend">
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
				<div id="MultiTimeEvents">                  
					
					<asp:Repeater ID="MultiTimeEventRepeater" runat="server"  OnItemDataBound="MultiTimeEventRepeater_ItemDataBound" EnableTheming="true">
						<HeaderTemplate>
							<div class="MultiTimeEventTopHeader">
								<asp:Literal ID="MultiTimeAvailabilityLiteral" runat="server" /><br />
								<asp:Literal ID="MultiTimeEventDateLiteral" runat="server" />
                            </div>
							<div class="MultiTimeEventScroll">
							<table id="MultiTimeEventBody">
								<tr id="MultiTimeEventHeaderRow">
								    <th id="MultiTimeEventTimeHeaderCell" runat="server"><asp:Literal ID="EventTimeLiteral" Text="Event Time" runat="server" /></th>
								    <th id="MultiTimeEventNameCell" ><asp:Literal ID="EventNameLiteral" Text="Event Name" runat="server" /></th>
								    <th id="MultiTimeEventStatus"><asp:Literal ID="EventAvailablityLiteral" Text="Status" runat="server" /></th>
								    <th id="MultiTimeEventAvailability"><asp:Literal ID="EventQtyAvailableLiteral" Text="Available" runat="server" /></th>
								    <th id="MultiTimeQuantityCell"><asp:Literal ID="EventQtyLiteral" Text="Qty" runat="server" /></th>
                                    
								</tr>
                                <%--<tr>
                                <td id="MultiTimeEventBody" colspan="6">
                            
                            <table>--%>
						</HeaderTemplate>
						<ItemTemplate>
                        
							<tr id="MultiTimeEventTimeRow" runat="server">  
								    <td id="MultiTimeEventTimeCell" runat="server" ><asp:Label ID="MultiTimeEventTimeLabel" runat="server" /></td>
								    <td class="MultiTimeEventNameCell"><asp:Label ID="MultiTimeEventNameLabel" runat="server" /></td>
								    <td class="MultiTimeEventStatus"><asp:Literal ID="MultiTimeEventAvailabilityLiteral" runat="server" /></td>
								    <td class="MultiTimeEventAvailability"><asp:Literal ID="MultiTimeQuantityLiteral" runat="server" /></td>
                                    <td class="MultiTimeExtCell">
                                        <div class="MultiTimeQtyWrapper">
                                        <div id="numeric-down">
                                             <asp:ImageButton ID="DownImageButton" CssClass="DownButton" runat="server" ImageUrl="~/images/GTS/minus_12x3.png" AlternateText="Down" Width="12" Height="5" />
                                        </div>
                                        <div id="numeric-box"><asp:TextBox ID="MultiTimeQuantityTextBox" EnableViewState="true" runat="server"
                                            Text="0" Width="40" MaxLength="4" Style="text-align: center" /></div>
                                         <div id="numeric-up">
                                              <asp:ImageButton ID="UpImageButton" CssClass="UpButton" runat="server" ImageUrl="~/images/GTS/plus_12x12.png" AlternateText="Up" Width="12" Height="12" />
                                         </div>            
                                        <cc2:NumericUpDownExtender id="NumericUpDownExtenderControl" runat="server" targetcontrolid="MultiTimeQuantityTextBox" OnResolveControlID="NumericUpDownExtenderControl_ResolveControlID" Step="1"
                                            targetbuttondownid="DownImageButton" targetbuttonupid="UpImageButton" servicedownmethod="" serviceupmethod="" ></cc2:NumericUpDownExtender>
                                        
                                    </td> 
                                    
							</tr>
							<tr id="MultiTimeEventAttributesRow" runat="server" visible="false" class="MultiTimeEventAttributesRow">
								<td></td>
								<td colspan="4">
									<div class="MultiTimeEventAttributesList">
										<asp:BulletedList ID="MultiTimeEventAttributesBulletedList" runat="server" />
									</div>
								</td>
							</tr>
                           
						</ItemTemplate>                        
						<FooterTemplate>
							 <%--</table>
                             
                            </td>
                            </tr>--%>
							</div>
                            <tr>
                            <td id="MultiTimeEventFooterRow" colspan="6"></td>
                            </tr>
                            </table>
						</FooterTemplate>                                                                                              
					</asp:Repeater>
				</div>
				<!-- Template for Empty Events -->
				<table id="NoEventTimesTable" runat="server" visible="false">
					<tr>
						<td>
							<div id="NoEventTimesDisplay"><asp:Literal ID="NoEventTimesLiteral" runat="server" /></div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
		<td><!-- Modal Popup Close Button -->
			
		</td>
		<td class="ContinueButtonCell"><!-- Continue Button -->
			<span data-el="continueButton"><asp:Button ID="MultiTimeContinueButton" Text="Continue" CssClass="MultiTimeEventContinueButton" runat="server" OnClick="MultiTimeContinueButton_Click" /></span>
		</td>
		
		</tr>
	</table>		
</div>



