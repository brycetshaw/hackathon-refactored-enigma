# River water level forecaster

This will use an ML model to forecast the flow rate of the bow river in Calgary.

## Data Sources

- river flows (rivers.alberta.ca)
  - bow river in calgary (Probably we will start with a univariate model of this trend as a baseline)
  - bow river in canmore and lake louise
  - elbow river

- weather
  - precip (alberta.rivers.ca)
  - snow pillow (alberta.rivers.ca)

weather
  - environment canada?

## Formatting

  We probably want to save all our trends into a single dataframe, with hourly sample rate
