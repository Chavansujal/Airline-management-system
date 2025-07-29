class AirlineBookingApp:
    def __init__(self):  # Corrected from _init_ to __init__
        self.flights = {
            "101": {"destination": "New York", "seats": 5, "price": 500},
            "202": {"destination": "London", "seats": 3, "price": 700},
            "303": {"destination": "Paris", "seats": 4, "price": 600},
        }
        self.bookings = []

    def display_flights(self):
        print("\nAvailable Flights:")
        print(f"{'Flight No.':<10} {'Destination':<15} {'Seats':<10} {'Price':<10}")
        for flight_no, details in self.flights.items():
            print(f"{flight_no:<10} {details['destination']:<15} {details['seats']:<10} {details['price']:<10}")

    def book_flight(self):
        self.display_flights()
        flight_no = input("\nEnter the flight number to book: ")
        if flight_no in self.flights:
            flight = self.flights[flight_no]
            if flight['seats'] > 0:
                name = input("Enter your name: ")
                seats = int(input("Enter number of seats to book: "))
                if seats <= flight['seats']:
                    flight['seats'] -= seats
                    booking = {
                        "name": name,
                        "flight_no": flight_no,
                        "destination": flight['destination'],
                        "seats": seats,
                        "total_price": seats * flight['price'],
                    }
                    self.bookings.append(booking)
                    print(f"\nBooking successful for {name}. Total price: ${booking['total_price']}")
                else:
                    print("\nNot enough seats available!")
            else:
                print("\nSorry, no seats available on this flight!")
        else:
            print("\nInvalid flight number!")

    def view_bookings(self):
        if not self.bookings:
            print("\nNo bookings made yet.")
        else:
            print("\nYour Bookings:")
            for booking in self.bookings:
                print(f"Name: {booking['name']}, Flight No: {booking['flight_no']}, Destination: {booking['destination']}, Seats: {booking['seats']}, Total Price: ${booking['total_price']}")

    def run(self):
        while True:
            print("\n--- Airline Booking App ---")
            print("1. View Flights")
            print("2. Book a Flight")
            print("3. View My Bookings")
            print("4. Exit")
            choice = input("Enter your choice: ")

            if choice == "1":
                self.display_flights()
            elif choice == "2":
                self.book_flight()
            elif choice == "3":
                self.view_bookings()
            elif choice == "4":
                print("\nThank you for using the Airline Booking App!")
                break
            else:
                print("\nInvalid choice! Please try again.")

# Run the application
if __name__ == "__main__":
    app = AirlineBookingApp()
    app.run()