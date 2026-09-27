package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.appointment;

import br.fai.lds.elderconnect.domain.Appointment;
import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.appointment.AppointmentDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.appointment.AppointmentService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentServiceAdapter implements AppointmentService {

    private AppointmentDao appointmentDao;

    private UserDao userDao;

    @Override
    public int create(Appointment appointment) {

        if (appointment == null) {
            return 0;
        }

        UserModel userSenior = findSeniorById(appointment.getSeniorId());

        if (userSenior == null) {
            return 0;
        }

        if (appointment.getDate() == null || appointment.getDate().isEmpty()) {
            return 0;
        }

        if (appointment.getTime() == null || appointment.getTime().isEmpty()) {
            return 0;
        }

        LocalDate appointmentDate = LocalDate.parse(appointment.getDate());

        if (appointmentDate.isBefore(LocalDate.now())) {
            return 0;
        }

        LocalTime appointmentTime = LocalTime.parse(appointment.getTime());

        if (appointmentTime.isBefore(LocalTime.now())) {
            return 0;
        }

        if (appointment.getTitle() == null || appointment.getTitle().isEmpty()) {
            return 0;
        }

        if (appointment.getType() == null || appointment.getType().isEmpty()) {
            return 0;
        }

        return appointmentDao.add(appointment);
    }

    @Override
    public void delete(int id) {

        if (isIdInvalid(id)) {
            return;
        }

        appointmentDao.remove(id);
    }

    @Override
    public Appointment findById(int id) {
        if (isIdInvalid(id)) {
            return null;
        }

        return appointmentDao.readyById(id);
    }

    @Override
    public List<Appointment> findAll() {
        return appointmentDao.readAll();
    }

    @Override
    public boolean update(int id, Appointment appointment) {
        if (isIdInvalid(id) || appointment == null) {
            return false;
        }

        Appointment dataToUpdate = findById(id);

        if (dataToUpdate == null) {
            return false;
        }

        if (appointment.getDate() == null || appointment.getDate().isEmpty()) {
            return false;
        }

        if (appointment.getTime() == null || appointment.getTime().isEmpty()) {
            return false;
        }

        LocalDate appointmentDate = LocalDate.parse(appointment.getDate());

        if (appointmentDate.isBefore(LocalDate.now())) {
            return false;
        }

        LocalTime appointmentTime = LocalTime.parse(appointment.getTime());

        if (appointmentTime.isBefore(LocalTime.now())) {
            return false;
        }

        if (appointment.getTitle() == null || appointment.getTitle().isEmpty()) {
            return false;
        }

        if (appointment.getType() == null || appointment.getType().isEmpty()) {
            return false;
        }

        dataToUpdate.setDate(appointment.getDate());
        dataToUpdate.setTime(appointment.getTime());
        dataToUpdate.setTitle(appointment.getTitle());
        dataToUpdate.setType(appointment.getType());
        dataToUpdate.setResponsible(appointment.getResponsible());
        dataToUpdate.setNotes(appointment.getNotes());

        appointmentDao.updateInformation(id, dataToUpdate);

        return true;
    }

    @Override
    public List<Appointment> findBySeniorId(int seniorId) {

        if (isIdInvalid(seniorId)) {
            return List.of();
        }

        UserModel senior = findSeniorById(seniorId);

        if (senior == null) {
            return List.of();
        }

        return appointmentDao.readBySeniorId(seniorId);
    }

    private UserModel findSeniorById(int id) {

        UserModel userSenior = userDao.readyById(id);

        if (userSenior == null) {
            return null;
        }

        if (userSenior.getUserType() != UserModel.UserType.IDOSO) {
            return null;
        }

        return userSenior;
    }

    private boolean isIdInvalid(int id) {
        return id <= 0 ? true : false;
    }
}
