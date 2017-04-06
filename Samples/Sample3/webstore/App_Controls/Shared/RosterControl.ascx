<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RosterControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.Roster" %>
<%@ Register Src="CustContactsForm.ascx" TagName="CustContactsForm" TagPrefix="uc1" %>

    <div id="RosterInfo" data-replace="RosterInfo">
    <div class="RosterDescription">
        <table>
            <tr>
                <td data-text="RosterDescriptionLiteral"><asp:Literal ID="RosterDescriptionLiteral" runat="server" /></td>
            </tr>
            <tr>
                <td data-text="RosterIndexDescriptionLiteral"><asp:Literal ID="RosterIndexDescriptionLiteral" runat="server" /></td>
            </tr>
        </table>
    </div>
    <table>
        <tr>
            <td>
                <div id="CustContactLogon">
                    <asp:PlaceHolder ID="CustContactLogonPlaceHolder" runat="server">
	                    <div data-el="UseCustContactLogonCheckBox">
							<asp:CheckBox ID="UseCustContactLogonCheckBox" AutoPostBack="true" 
								OnCheckedChanged="UseCustContactLogonCheckBox_OnCheckChanged"
								Text="Use logon contact information" runat="server" Visible="false" />
						</div>
                    </asp:PlaceHolder>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <asp:PlaceHolder ID="CustContacts" runat="server" >
                    <uc1:CustContactsForm ID="CustContactsForm" runat="server" DisplayCell="false" />
                </asp:PlaceHolder>
            </td>
        </tr>
        <tr>
            <td>
                <asp:PlaceHolder ID="RosterAttributesPlaceHolder" runat="server" >
        		    
		            <asp:GridView ID="RosterInfoGridView" runat="server" AutoGenerateColumns="false" ShowHeader="false"
		                ShowFooter="false" GridLines="None" OnRowDataBound="RosterInfoGridView_RowDataBound"
		                DataKeyNames="AttributeDefinitionID">
            
                        <Columns>
					        <%--<asp:BoundField DataField="Name" />--%>
							<asp:TemplateField>
								<ItemTemplate>
									<span data-table-shift="rosterQuestions">
									<span data-text="rosterQuestionLabel">
										<asp:Label ID="Label1" runat="server" Text='<%# Bind("Name") %>'></asp:Label>
									</span>
								</ItemTemplate>
							</asp:TemplateField>
                            
                            <asp:TemplateField>
                                <ItemTemplate>
	                                <span data-html="rosterResponse">
										<asp:PlaceHolder ID="RosterAttributePlaceHolder" runat="server" />
									</span>
                                </ItemTemplate>
                            </asp:TemplateField>
                        
   					        <asp:TemplateField>
						        <ItemTemplate>
							        <span data-html="surveyResponseValidator">
										<asp:PlaceHolder ID="RosterAttributeRequiredFieldValidatorPlaceHolder" runat="server" />
									<span>
						        </ItemTemplate>
					        </asp:TemplateField>

                        </Columns>
                    </asp:GridView>
                        
                </asp:PlaceHolder>
            </td>
        </tr>
    </table>	
        <div id="rosterInfoButtons">
            <div id="rosterInfoCancelButton" data-el="rosterInfoCancelButton"><asp:Button ID="CancelButton" runat="server" OnClick="CancelButton_OnClick" /></div>
        	<div id="rosterInfoContinueButton" data-el="rosterInfoContinueButton"><asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" /></div>
	    </div>
    </div>
