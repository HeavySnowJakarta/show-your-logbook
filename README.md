# Show your logbook

A completely severless solution to store the amatuer radio logbook on the net and show it to others.

## Log field definitions

The logbook online includes the following data:

+ `id`: UUID
+ `call`: Text: Their callsign.
+ `utc`: Timestamp. The date and time in UTC without timezone.
+ `freq_hz`: Float64. The frequency in Hz.
+ `mode`: Text.
+ `my card`: Text: One of `Failed to contact` (in red), `Preparing` (in yellow), `Sent` (in green) and `Cancelled` (in gray).
+ `your card`: Text: One of `Not received` (in yellow) and `Received` (in green).
+ `lotw`: Text: One of `Preparing` (in orange), `QSO` (in blue) and `QSL` (in green).