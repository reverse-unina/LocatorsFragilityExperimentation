# LocatorsFragilityExperimentation
This repository contains the Experimental Material of a set of experiments aiming at assessing the fragility of test cases based on different types of locators with respect to different types of layout changes.

# Steps for the execution of Locators Fragility Experimentation
See also the related [Wiki on the execution of the experimentation](https://github.com/reverse-unina/LocatorsFragilityExperimentation/wiki/Locators-Fragility-Experimentation-Steps).

# Overview
This repository contains the following folders and subfolders:
- **[BreakageExamples]**:
  - [A1-Contact List]
  - [A2-Spotify]
- **[LocatorsImplementation]**:
  - [Absolute]
  - [Hook-based]
  - [Katalon]
  - [Relative]
  - [Robula]
- **[TestCases]**:
  - [Test_Case_A1]
  - [Test_Case_A2]
- **[YamlWorkflowSourceCode]**

# Breakage Examples

The BreakageExample folder contains two subdirectories representing the two tested applications, namely "Contact List" and "Spotify." The structure of the two subdirectories is similar and each folder contains a directory for each documented test case. The documentation of each test case consists of: 1) the HTML file subject to modification, 2) the HTML file after modification, 3) an image showing the differences between the HTML files before and after modification, and 4) an XLS file showing the failures report for each test case.

# Locators Implementation

The directory named "Locators Implementation" contains a subdirectory for each type of tested locator, namely Robula, Katalon, Hook, Absolute and Relative. Inside each subdirectory, there is a JavaScript file that contains the source code of the locator. Additional explanations of the contents of this folder can be found in the related readme file.

# TestCases

The BreakageExample folder contains two subdirectories representing the two tested applications, namely "Contact List" and "Spotify." Within each subfolder there are the Java files containing the test cases divided by locator type.


# YamlWorkflow Source Code

The Yaml Work flow Source Code folder contains two YAML files that represent the two workflows used in our experimentation through GitHub Actions. In particular, the "main.yml" file indicates the workflow that handles the execution of test cases on each new release. On the other hand, the "mainOnPush.yml" file represents the workflow responsible for the injection of the hook locators inside our application under test (AUT).

# Test Result A1

The Test Result A1 is a file that contains the test case report of the Contact List application (A1). The results are presented in a tabular format, where the columns denote the locator, and the rows indicate the type of change. Additionally, a "Legend" is included within the file that provides further details on the notation used for the test report.

# Test Result A2

Some of Test Result A1

# Test Result Summary

Some of Test Result A1, but it's a summary containg all the test case for both application




