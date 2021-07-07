
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
  .truncate() // empties the table and resets the primary key (id)
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '12K3GC1UF34XF1JJV1',
        car_make: 'Dodge',
        car_model: '2500 Cummins',
        mileage: 240000,
        transmission_type: 'Automatic',
        title_status: 'Clean title'
        },
        {vin: 'JE7D8GB47NNG8DAQ5W2',
        car_make: 'Chevrolet',
        car_model: '2500 Duramax',
        mileage: 120000,
        transmission_type: 'Automatic',
        title_status: 'Clean title'
        },
        {vin: 'HJKI38DNC038DJK3',
        car_make: 'Ford',
        car_model: 'F-250 PowerStroke',
        mileage: 15000,
        transmission_type: 'Automatic',
        title_status: 'Salvage title'
        }
        
      ]);
    });
};
