*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${URL}         http://localhost:8080/
${WAIT_TIME}   5s

*** Test Cases ***
Navbar Visibility for Anonymous Users
    Open Browser    ${URL}    chrome    # Or your preferred browser
    Wait Until Page Contains Element    xpath=//span[contains(text(), 'Hi')]    ${WAIT_TIME}
    Page Should Not Contain Element    xpath=//a[text()='Admin View']
    Page Should Not Contain Element    xpath=//a[text()='New Product']
    Page Should Not Contain Element    xpath=//a[text()='Past Orders']
    Page Should Contain Element        xpath=//a[text()='Register']
    Page Should Contain Element        xpath=//a[text()='Login']
    Page Should Contain Element        xpath=//a[text()='About us']
    Close Browser

