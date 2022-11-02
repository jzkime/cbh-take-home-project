# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
api - where .POST and .GET requests are broadly created<br/>
middleware - called in the api to check for validity, and that check against the model responses<br/>
model - files that interact with the database<br/>


#### Ticket 1
EstimatedTime: 20 minutes<br/>
Update the Agents table to have a "custom_id" column, where the default is 'null'. This will allow for the Facilties to save the specific customId and later be called upon. (Clearance check of Facilitiy authorization to be implemented later).
Assure that any data seeds are updated to match.

#### Ticket 2
EstimatedTime: 30 minutes<br/>
- this is under the asumption that there is a column in the Agent's table that says what Facility they are connected to.

Create a POST request function in the api, that will require `facilities_id` and current `agent_id`, and the new `custom_id`. This will need Middleware to check that the `facilities_id` exists, the current `agent_id` exists in the database(yet to be implemented), and comparing against the returning data of the Agent table, if the `facilities_id` matches the `facilities_id`, then it will continue the action, otherwise it will send an error to the client.

#### Ticket 2
EstimatedTime: 40 minutes<br/>
In the api model, that connects to the database, create a function that calls on the database using leftJoin, WHERE `agent_id` matches the passed in parameter of `agent_id` to the Agents table and `facility_id` matches the `facility_id` in the Facilities table, to assure that both exists. This need to then return an object containing { `agent_id`, `facility_name`, `custom_id` } that is connected to that Agent. 

- (`facility_name` is from the facility table, to assure the facility that is requesting this information is connected to this specific agent)

#### Ticket 3
EstimatedTime: 20 minutes<br/>
Create another middleware that calls on that api model function and saves the return value to the request. If there is a preexisting `custom_id` then return an error saying as such. Otherwise, perform another function, yet to be implemented, that will add that `custom_id` to that agent. 

#### Ticket 4
EstimatedTime: 30 minutes<br/>
In the api model, create a addCustomId function, with the parameters `agent_id` and `custom_id` that will call onto the database, and where the `agent_id` matches, will update the database for the `custom_id`. This should return the newly created database object, mostlikely with the function before that leftJoined the Facilities table and the Agents table.

#### Ticket 5
EstimatedTime: 10 minutes<br/>
Finally, with the new Agent object that was received from the database, assure that the api returns a 201 response, optionally containing the object (if required).
