<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ViewSchedules.aspx.cs" Inherits="Gateway.WebStore.Transportation.ViewSchedules" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    <asp:UpdatePanel ID="ViewSchedulesUpdatePanel" runat="server">
    <ContentTemplate>
        <div id="ViewSchedulesWrapper">
        
         <table id="ViewSchedulesTable">            
                <tr>
                    <td><asp:Literal ID="CarrierFeed" runat="server"></asp:Literal><br /></td></tr>
                <tr>
                <tr>
                    <td><asp:Literal ID="CarrierLiteral" Text="Show schedules for carrier" runat="server" /></td>
                </tr>
                
                    <td><asp:DropDownList ID="CarrierDropDownList" CssClass="TripDropdownList" runat="server" AutoPostBack="True"  OnSelectedIndexChanged="CarrierDropDownList_SelectedIndexChanged" /></td>
                </tr>
          </table>
          <br />
          <asp:Panel ID="CarrierSchedulesPanel" CssClass="CarrierSchedPanel" runat="server">
        <cc1:TabContainer ID="CarrierScheduleTabContainer" runat="server" CssClass="TabContainer">
            <cc1:TabPanel ID="SchedulesSummaryTabPanel" runat="server" CssClass="Tab">
                <HeaderTemplate>
                   <asp:literal ID="ViewSchedSummaryTabLiteral" runat="server" />
                </HeaderTemplate>
                <ContentTemplate>                
                <div class="TabDescriptionLabel">
                    <asp:Label ID="SummaryDescription" runat="server" />
                </div>
                <div id="CarrierSummary" >
                <div class="scroll_schedules">
                <asp:GridView ID="CarrierSummaryGridView" GridLines="None" CellPadding="0" CssClass="CarrierSummaryGridView"  runat="server" AutoGenerateColumns="False" OnRowDataBound="CarrierSummaryGridView_RowDataBound" OnRowCommand="CarrierSummaryGridView_RowCommand">
                  <Columns>                     
                            <asp:TemplateField>
                                <HeaderTemplate>
                                    <asp:literal ID="CarrierSelectColumnLiteral" runat="server" />
                                </HeaderTemplate>
                                <HeaderStyle CssClass ="SelectColumnCell" />
                                <ItemTemplate>
                                    <asp:LinkButton ID="DetailLinkButton" CommandName="ShowDetails" runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="SelectColumnCell" />                                
                            </asp:TemplateField>
                            
                            <asp:TemplateField>
                                <HeaderTemplate>
                                    <asp:literal ID="CarrierSchedColumnLiteral"  runat="server"></asp:literal>
                                </HeaderTemplate>
                                <HeaderStyle CssClass ="SchedColumnCell" />
                                <ItemTemplate>
                                    <asp:Label ID="CarrierSchedLabel"  runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="SchedColumnCell" />
                            </asp:TemplateField>
                            
                            <asp:TemplateField>
                                <HeaderTemplate>                                    
                                     <asp:literal ID="CarrierDescriptionColumnLiteral"  runat="server"/>
                                </HeaderTemplate>
                                <HeaderStyle CssClass ="DescriptionColumnCell" />
                                <ItemTemplate>
                                    <asp:Label ID="CarrierSchedDescriptionLabel"  runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="DescriptionColumnCell" />
                            </asp:TemplateField>                            
                            
                            <asp:TemplateField>
                                <HeaderTemplate>                                    
                                    <asp:Literal ID="CarrierLeavesColumnLiteral" runat="server"/>
                                </HeaderTemplate>
                                <HeaderStyle CssClass ="LeavesColumnCell" />
                                <ItemTemplate>
                                    <asp:Label ID="CarrierLeavesLabel"  runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="LeavesColumnCell" />
                            </asp:TemplateField>
                            
                            <asp:TemplateField>
                                <HeaderTemplate>
                                    <asp:Literal ID="CarrierArrivesColumnLiteral" runat="server" /> 
                                </HeaderTemplate>
                                <HeaderStyle CssClass ="ArrivesColumnCell" />
                                <ItemTemplate>
                                    <asp:Label ID="CarrierArrivesLabel"  runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="ArrivesColumnCell" />
                            </asp:TemplateField>
                            
                            <asp:TemplateField>
                                <HeaderTemplate>
                                    <asp:Literal ID="CarrierStopsColumnLiteral" runat="server"  />
                                </HeaderTemplate>
                                <HeaderStyle CssClass ="StopsColumnCell" />
                                <ItemTemplate>
                                    <asp:Label ID="CarrierStopsLabel" runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="StopsColumnCell" />
                            </asp:TemplateField>                           
                            
                            <asp:TemplateField>
                                <HeaderTemplate>
                                    <asp:Literal ID="CarrierOperatesColumnLiteral" runat="server" />
                                </HeaderTemplate> 
                                <HeaderStyle CssClass="OperatesColumnCell" />                               
                                <ItemTemplate>
                                    <asp:Label ID="CarrierOperatesLabel"  runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="OperatesColumnCell" />
                            </asp:TemplateField>        
                    
                        </Columns>
                    </asp:GridView>
                    </div>
                  </div>                  
                </ContentTemplate>
            </cc1:TabPanel>
            <cc1:TabPanel ID="SchedulesDetailTabPanel" runat="server" CssClass="Tab">
            <HeaderTemplate>
                   <asp:literal ID="ViewSchedDetailLiteral" runat="server" />
                </HeaderTemplate>
                <ContentTemplate>
                <div class="TabDescriptionLabel ">
                        <asp:Label ID="DetailsDescription" runat="server" />
                </div>
               <div id="CarrierDetail">
                <asp:GridView ID="CarrierDetailGridView" GridLines="None" CellPadding="0" CssClass="CarrierDetailGridView"  runat="server" AutoGenerateColumns="False" OnRowDataBound="CarrierDetailGridView_RowDataBound">
                    <Columns>                      
                            <asp:TemplateField>
                                <HeaderTemplate><asp:Literal ID="CarrierDetailSegColumnLiteral" runat="server" /></HeaderTemplate>
                                <HeaderStyle CssClass="SegColumnCell" />
                                <ItemTemplate>
                                    <asp:Label ID="DetailSegLabel"  runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="SegColumnCell" />
                            </asp:TemplateField>
                            
                            <asp:TemplateField>
                                <HeaderTemplate><asp:Literal ID="CarrierDetailStopsColumnLiteral" runat="server" /></HeaderTemplate>
                                <HeaderStyle CssClass="StopsColumnCell" />
                                <ItemTemplate>
                                    <asp:Label ID="DetailStopsLabel" runat="server"/>
                                </ItemTemplate>
                                <ItemStyle CssClass="StopsColumnCell" />
                            </asp:TemplateField>                            
                            
                            <asp:TemplateField>
                                <HeaderTemplate><asp:Literal ID="CarrierDetailArrivesColumnLiteral" runat="server" /></HeaderTemplate>
                                <HeaderStyle CssClass ="ArrivesColumnCell"/>
                                <ItemTemplate>
                                    <asp:Label ID="DetailArrivesLabel"  runat="server"/>
                                </ItemTemplate>
                                <ItemStyle CssClass="ArrivesColumnCell" />
                            </asp:TemplateField>
                            
                            <asp:TemplateField>
                                <HeaderTemplate><asp:Literal ID="CarrierDetailLeavesColumnLiteral" runat="server"/></HeaderTemplate>
                                <HeaderStyle CssClass ="LeavesColumnCell"/>
                                <ItemTemplate>
                                    <asp:Label ID="DetailLeavesLabel" runat="server"/>
                                </ItemTemplate>
                                <ItemStyle CssClass="LeavesColumnCell" />
                            </asp:TemplateField>
                            
                            <asp:TemplateField>
                                <HeaderTemplate><asp:Literal ID="CarrierDetailLayoverColumnLiteral" runat="server"/></HeaderTemplate>
                                <HeaderStyle CssClass="LayoverColumnCell" />
                                <ItemTemplate>
                                    <asp:Label ID="DetailLayoverLabel"  runat="server" />
                                </ItemTemplate>
                                <ItemStyle CssClass="LayoverColumnCell" />
                            </asp:TemplateField> 
                        </Columns>
                    </asp:GridView>
                  </div>  
                </ContentTemplate>
                
            </cc1:TabPanel>
        </cc1:TabContainer>
    </asp:Panel>
    <div class="CarrierMessage">
            <asp:Label ID="CarrierMessegeLabel" runat="server" />
    </div>         
</div> <!--ViewSchedules Wrapper End--> 
    
    </ContentTemplate>
    </asp:UpdatePanel>
    <asp:UpdateProgress ID="UpdateProgress" runat="server" DynamicLayout="False" >
        <ProgressTemplate>
          <div class="updateProgressImage">
            <asp:Image ID="UpdateProgressImage" runat="server" ImageUrl="~/images/GTS/ajax-loading.gif" />
            <br /> <asp:Label ID="UpdateProgressLabel" runat="server"/>
            </div>
          <div class="updateprogress">         
          </div>
        </ProgressTemplate>
      </asp:UpdateProgress>

</asp:Content>
