<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="GroupSalesQuestionnaire.aspx.cs" Inherits="Gateway.WebStore.shop.GroupSalesQuestionnaire" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <div id="GroupSalesQuestionnaire" data-replace="GroupSalesQuestionnaire">

        <table>
            <tr>
            <td>
                <asp:GridView ID="QuestionnaireGridView"
					runat="server"
					AutoGenerateColumns="false"
					ShowHeader="false"
                    ShowFooter="false"
                    GridLines="None"
                    OnRowDataBound="QuestionnaireGridView_RowDataBound"
                    DataKeyNames="AttributeDefinitionID">

                    <Columns>
                     
                        <asp:TemplateField>
                            <ItemTemplate>
                                <span data-el="fieldName"><asp:HiddenField runat="server" id="FieldName"/></span>
                                <span data-table-shift="questions"></span>
                                <span data-el="input"><asp:PlaceHolder ID="AttributePlaceHolder" runat="server" /></span>
                            </ItemTemplate>
                        </asp:TemplateField>
                    
		                <asp:TemplateField>
			                <ItemTemplate>
			                <span data-el="error"><asp:PlaceHolder ID="AttributeRequiredFieldValidatorPlaceHolder" runat="server" /></span>
			                </ItemTemplate>
		                </asp:TemplateField>

                    </Columns>
                </asp:GridView>
            </td>
            </tr>
        
        <tr>
            <td data-el="continue">
        	    <asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" />
	        </td>
        </tr>
        
        </table>
    
    </div>
    
     <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/groupSalesQuestionnaire.html") %>

</asp:Content>