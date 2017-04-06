<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ETicketsSelector.ascx.cs" Inherits="Gateway.WebStore.Transportation.ETicketsSelector" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<div id="ETicketsSelector">
    <asp:Panel ID="ETicketOriginDestination" runat="server">       
        <asp:Panel ID="UserMessagePanel" runat="server">
			<div class="usermessage">
				 <asp:Literal ID="UserMessageLiteral" runat="server" />
			</div>
		</asp:Panel>
        <table id="ETicketsSelectorTable" cellpadding="0" cellspacing="0">
			<tr>
				<td colspan="3" >
					<div class="TripSelectionHeader">               
						<asp:Literal ID="TripDescriptionLiteral" runat="server" />
					</div>                
				</td>
			</tr>        
            <tr>
            <td>
            <div class="TripSelectionContent">          
                <table id="ETicketTripTable">                           
                    <tr>
                        <td><asp:Literal ID="OrigLiteral" runat="server" /></td>
                    </tr>
                    <tr>
                        <td><asp:DropDownList ID="OrigDropDownList" runat="server" class="TripDropdownList" AutoPostBack="True" OnPreRender="OrigDropDownList_PreRender" OnSelectedIndexChanged="OrigDropDownList_SelectedIndexChanged" /></td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Literal ID="DestLiteral" runat="server" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:DropDownList ID="DestDropDownList" runat="server" class="TripDropdownList" AutoPostBack="True" OnPreRender="DestDropDownList_PreRender" OnSelectedIndexChanged="DestDropDownList_SelectedIndexChanged" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <div id="TripModeSelection">
                            <asp:Panel ID="RadioButtonListPanel" runat="server">
                                <asp:RadioButton ID="OneWayRadioButtonList" runat="server" AutoPostBack="true" GroupName="TripType" oncheckedchanged="RadioButtonList_CheckedChanged" /> <br />                            
                                <asp:RadioButton ID="RoundTripRadioButtonList" runat="server" AutoPostBack = "true" GroupName="TripType" oncheckedchanged="RadioButtonList_CheckedChanged" />
                            </asp:Panel>
                           </div>
                        </td>
                    </tr>
                </table>
               </div>
                     
            </td>
            <td id="DepartCalendarCell">
            <div class ="CalendarContainer">
                 <asp:Panel ID="DepartPanel" runat="server" CssClass="CalendarPanel" Visible="false">
                   
                    <div class="CalenderHeader">
                          <asp:Label ID="DepartHeaderLabel" runat="server" ></asp:Label>
                    </div>
                    <table>
                    <tr>
                    <td><asp:Menu ID="DepartCalendarTabMenu"  runat="server" CellPadding="0" CellSpacing="0" CssClass="CalendarMenu" OnMenuItemClick="Calendar_MenuItemClick" Orientation="Horizontal">                  
                      <Items>
                        <asp:MenuItem selected="true" Value="0"></asp:MenuItem>
                        <asp:MenuItem Value="1"></asp:MenuItem>
                        <asp:MenuItem Value="2"></asp:MenuItem>
                        <asp:MenuItem Value="3"></asp:MenuItem>
                      </Items>                  
                      <StaticSelectedStyle CssClass="TabSelected" />
                      <StaticMenuItemStyle CssClass ="Tab" />
                      <StaticHoverStyle CssClass="TabHover" />
                    </asp:Menu>
                    </td></tr>
                    </table>
                    <asp:Calendar ID="DepartCalendar" runat="server" CellPadding="0" CellSpacing="0" CssClass="Calendar" SelectedDate="1900-01-01"
                                  OnDayRender="Calendar_DayRender" 
                                  OnSelectionChanged="DepartCalendar_SelectionChanged"
                                  ShowNextPrevMonth="False">  
                        <OtherMonthDayStyle CssClass="CalendarOtherMonthHeader" />
                        <DayHeaderStyle CssClass="CalendarDayHeader"/>
                        <TitleStyle  CssClass="CalendarTitle" /> 
                        <TodayDayStyle CssClass="CalendarTodayDay" />
                        <SelectedDayStyle CssClass="CalendarSelectedDay" />                               
                        <DayStyle CssClass="CalendarDayStyle" />      
                    </asp:Calendar>                   
                  </asp:Panel>
            </div>    
            </td>
            <td id="ReturnCalendarCell">        
            <div class="CalendarContainer">
                 <asp:Panel ID="ReturnPanel" runat="server" CssClass="CalendarPanel" Visible="false">
                    
                   <div class ="CalenderHeader">
                          <asp:Label ID="ReturnHeaderLabel" runat="server" />
                   </div>
                    <table>
                    <tr>
                    <td><asp:Menu ID="ReturnCalendarTabMenu" runat="server" CssClass="CalendarMenu" OnMenuItemClick="Calendar_MenuItemClick" Orientation="Horizontal">                  
                      <Items>
                        <asp:MenuItem selected="true" Value="0"></asp:MenuItem>
                        <asp:MenuItem Value="1"></asp:MenuItem>
                        <asp:MenuItem Value="2"></asp:MenuItem>
                        <asp:MenuItem Value="3"></asp:MenuItem>
                      </Items>
                      <StaticSelectedStyle CssClass="TabSelected" />
                      <StaticMenuItemStyle CssClass ="Tab" />
                      <StaticHoverStyle CssClass="TabHover" />                      
                    </asp:Menu>
                    </td></tr>
                    </table>
                    <asp:Calendar ID="ReturnCalendar" runat="server" CellPadding="0" CellSpacing="0" CssClass="Calendar" SelectedDate="1900-01-01" ShowNextPrevMonth="False"
                                  OnDayRender="Calendar_DayRender" 
                                  OnSelectionChanged="ReturnCalendar_SelectionChanged" >  
                        <OtherMonthDayStyle CssClass="CalendarOtherMonthHeader" />
                        <DayHeaderStyle CssClass="CalendarDayHeader"/>
                        <TitleStyle  CssClass="CalendarTitle" /> 
                        <TodayDayStyle CssClass="CalendarTodayDay" />
                        <SelectedDayStyle CssClass="CalendarSelectedDay" />
                        <DayStyle CssClass="CalendarDayStyle" />
                    </asp:Calendar>                   
                  </asp:Panel>
            </div>
            </td>
            </tr>       
    </table>
    </asp:Panel>
</div>